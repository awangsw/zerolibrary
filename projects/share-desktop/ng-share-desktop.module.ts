import { ModuleWithProviders, NgModule } from '@angular/core';

import { DirectiveModule } from './core/directive/directive.module';
import { PipeModule } from './core/pipe/pipe.module';
import { MapBaiduModule } from './map-baidu/map-baidu.module';
import { ImageCropperModule } from './image-cropper/image-cropper.module';
import { OrganizationStructureModule } from './organization-structure/organization-structure.module';
import { AddressModule } from './address/address.module';
import { ApprovalFlowModule } from './approval-flow/approval-flow.module';
import { ProductModule } from './product/product.module';

export * from './core';
export * from './component';

export * from './map-baidu';
export * from './image-cropper';
export * from './organization-structure';
export * from './address';
export * from './approval-flow';
export * from './product';

@NgModule({
  exports: [
    DirectiveModule,
    PipeModule,
    MapBaiduModule,
    ImageCropperModule,
    OrganizationStructureModule,
    AddressModule,
    ApprovalFlowModule,
    ProductModule
  ]
})
export class NgShareDesktopModule {
  /**
   * @deprecated Use `NgShareDesktopModule` instead.
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgShareDesktopModule
    };
  }
}
