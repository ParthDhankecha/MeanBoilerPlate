import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Config } from "./core/data/config";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "mean-boilerplate";

  constructor(private translate: TranslateService, private _config: Config) {
    this.translate.setDefaultLang("en");
    if (window.screen.width < 1024) {
      this._config.horizontalPlace = "center";
      this._config.verticalPlace = "bottom";
    }
  }

  changeLanguage(language) {
    this.translate.use(language);
  }
}
