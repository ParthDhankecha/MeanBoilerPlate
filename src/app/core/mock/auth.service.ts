import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "../data/config";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { UserAuth } from "../data/user-auth";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _config: Config,
    private _router: Router,
    private _translate: TranslateService
  ) {}

  private service = this._config.apiBaseUrl + "user/";

  /** All api's base url related to authentication */

  private _loginUserUrl = this.service + "login-user";
  private _registerUserUrl = this.service + "register-user";
  private _forgetPasswordUrl = this.service + "request-reset-password";
  private _resetPasswordUrl = this.service + "reset-password";

  /** Calls api for login the user */

  loginUser(user) {
    return this._http.post<any>(this._loginUserUrl, user);
  }

  /** Calls api for register the user */

  registerUser(user) {
    return this._http.post<any>(this._registerUserUrl, user);
  }

  /** Calls api for forgot password */

  forgotPassword(user) {
    return this._http.post<any>(this._forgetPasswordUrl, user);
  }

  /** Calls api for reset password */

  resetPassword(user) {
    let options = this._config.getHeader();
    return this._http.post<any>(this._resetPasswordUrl, user, options);
  }

  /** Function for logged out the user */

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    this._translate.get("LogoutMessage").subscribe(message => {
      this._config.showMessage(message);
    });
    this._router.navigate([""]);
  }
}
