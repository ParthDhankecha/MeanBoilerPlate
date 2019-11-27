import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PageRoutingModule } from "./page-routing.module";
import { ThemeModule } from "../theme/theme.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, PageRoutingModule, ThemeModule]
})
export class PageModule {}
