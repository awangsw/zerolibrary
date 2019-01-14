/**
 * @作者: zc
 * @时间: 2019-01-08 10:27:16
 * @描述: 图像裁剪
 * @使用: <zc-image-cropper [(isVisible)]="isVisibleCro"
 *          [resizeToWidth]="icWidht"
 *          [aspectRatio]="icRatio"
 *          [folderName]="folderName"
 *          (retImage)="retImage($event)">
 *        </zc-image-cropper>
 *
 *        // 图像裁剪
 *        isVisibleCro = false;
 *        // 尺寸宽度，单位 px
 *        icWidht = 100;
 *        // 比例
 *        icRatio = 1 / 1;
 *        // 文件夹模块名称
 *        folderName = 'formTemplate';
 */
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ImageUploadService } from './image-upload.service';
import { ToolsService, MessagesService } from '../service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'zc-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ImageCropperComponent implements OnInit {

  @Input() isVisible: Boolean = false;
  @Output() isVisibleChange: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  @Input() resizeToWidth = 100;

  @Input() aspectRatio = 1 / 1;

  @Input() folderName = 'default';

  @Output() retImage: EventEmitter<any> = new EventEmitter<any>();

  public imageChangedEvent = '';
  public croppedImage = '';

  public isRepeatClick = false;

  private getoss$: any;

  constructor(
    private tools: ToolsService,
    private msg: MessagesService,
    private imageUploadService: ImageUploadService
  ) { }

  ngOnInit() {
    this.imageChangedEvent = '';
    this.croppedImage = '';
  }

  public imageLoaded() {
    console.log('imageLoaded');
  }
  public loadImageFailed() {
    console.log('loadImageFailed');
  }

  // 绑定选择文件
  public fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  // 裁剪后的图像
  public imageCropped(image: string) {
    this.croppedImage = image;
  }

  // 图像格式化
  private formatImage() {
    return {
      base64: this.tools.isClone(this.croppedImage),
      files: new File([this.tools.convertBase64UrlToBlob(this.croppedImage)], `${this.tools.isGuid(16)}.png`)
    };
  }

  /**
   * 确定按钮
   */
  public handleOk() {
    if (this.croppedImage) {
      const images = this.formatImage();
      this.isRepeatClick = true;
      if (this.getoss$) { this.getoss$.unsubscribe(); }
      this.getoss$ = this.imageUploadService.uploadOSS(images.files, this.folderName).subscribe(res => {
        res.data.onreadystatechange = (event) => {
          if (event.target['readyState'] === 4) {
            images['fileurl'] = res.fileUrl;
            this.isVisible = false;
            this.isRepeatClick = false;
            this.isVisibleChange.emit(this.isVisible);
            this.retImage.emit(images);
          }
        };
      });
    } else {
      this.msg.warning('请先选择图片');
    }
  }

  /**
   * 取消按钮
   */
  public handleCancel() {
    if (this.getoss$) { this.getoss$.unsubscribe(); }
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

}
