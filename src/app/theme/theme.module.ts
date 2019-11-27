import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ThemeRoutingModule } from "./theme-routing.module";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { BlockUIModule } from "ng-block-ui";
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LayoutComponent],
  imports: [CommonModule, ThemeRoutingModule, BlockUIModule.forRoot()],
  exports: [FooterComponent]
})
export class ThemeModule {}
