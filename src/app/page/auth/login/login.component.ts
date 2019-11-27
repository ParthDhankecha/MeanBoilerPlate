import { Component, OnInit, Inject } from "@angular/core";
import { UserAuth } from "src/app/core/data/user-auth";
import { AuthService } from "src/app/core/mock/auth.service";
import { MatSnackBar } from "@angular/material";
import { Config } from "src/app/core/data/config";
import { TranslateService } from "@ngx-translate/core";
import { Md5 } from "md5-typescript";
import { InteractionService } from "src/app/core/mock/interaction.service";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public user: UserAuth = new UserAuth();
  public visible = "visibility_off";
  public inputType = "password";
  private helper = new JwtHelperService();

  constructor(
    private _authService: AuthService,
    @Inject(MatSnackBar) private _showMessage: MatSnackBar,
    private _config: Config,
    private _translate: TranslateService,
    private _interactionService: InteractionService,
    private _router: Router
  ) {}

  ngOnInit() {}

  showPassword() {
    if (this.inputType === "password") {
      this.inputType = "text";
      this.visible = "visibility";
    } else {
      this.inputType = "password";
      this.visible = "visibility_off";
    }
  }

  async loginUser() {
    let className;
    let emailReg = new RegExp(/.+@.+\..+/);
    className = "warn";
    if (!emailReg.test(this.user.email)) {
      this._showMessage.open("Enter Valid Username", "dismiss", {
        duration: 2000,
        panelClass: [className],
        verticalPosition: this._config.verticalPlace,
        horizontalPosition: this._config.horizontalPlace
      });
    } else {
      if (this.user.password.length < 4) {
        this._translate.get("MinValidPassword").subscribe(data => {
          this._showMessage.open(data, "dismiss", {
            duration: 2000,
            panelClass: [className],
            verticalPosition: this._config.verticalPlace,
            horizontalPosition: this._config.horizontalPlace
          });
        });
      } else {
        if (this.user.password.length > 64) {
          this._translate.get("MaxValidPassword").subscribe(data => {
            this._showMessage.open(data, "dismiss", {
              duration: 2000,
              panelClass: [className],
              verticalPosition: this._config.verticalPlace,
              horizontalPosition: this._config.horizontalPlace
            });
          });
        } else {
          let data = { email: "", password: "" };
          data.email = this.user.email;
          data.password = this.user.password;
          data.password = await Md5.init(data.password);
          this._interactionService.changeProgress(true);
          this._authService.loginUser(data).subscribe(
            res => {
              this._interactionService.changeProgress(false);
              if (res.status === 1) {
                className = "success";
                this._translate.get("SuccessLogin").subscribe(data => {
                  this._showMessage.open(data, "dismiss", {
                    duration: 2000,
                    panelClass: [className],
                    horizontalPosition: this._config.horizontalPlace,
                    verticalPosition: this._config.verticalPlace
                  });
                });
                localStorage.setItem("token", res.token);
                localStorage.setItem("refreshToken", res.refreshToken);
                localStorage.setItem(
                  "user_id",
                  this.helper.decodeToken(res.token).id
                );
              } else {
                this._translate.get("NoReponseFound").subscribe(data => {
                  this._showMessage.open(res.message, "dismiss", {
                    duration: 2000,
                    panelClass: [className],
                    verticalPosition: this._config.verticalPlace,
                    horizontalPosition: this._config.horizontalPlace
                  });
                });
              }
            },
            err => {
              this._interactionService.changeProgress(false);
              this._translate.get("NoResponseFound").subscribe(data => {
                this._showMessage.open(data, "dismiss", {
                  duration: 2000,
                  panelClass: [className],
                  verticalPosition: this._config.verticalPlace,
                  horizontalPosition: this._config.horizontalPlace
                });
              });
            }
          );
        }
      }
    }
  }
}
