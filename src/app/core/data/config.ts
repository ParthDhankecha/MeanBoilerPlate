import { HttpHeaders } from "@angular/common/http";
import { Inject } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material";

export class Config {
  public horizontalPlace: MatSnackBarHorizontalPosition = "right";
  public verticalPlace: MatSnackBarVerticalPosition = "top";
  public apiBaseUrl = "http://localhost:3000/";

  constructor(@Inject(MatSnackBar) private _message: MatSnackBar) {}

  public showMessage(data) {
    this._message.open(data, "dismiss", {
      duration: 3000,
      horizontalPosition: this.horizontalPlace,
      verticalPosition: this.verticalPlace
    });
  }

  public getHeader() {
    let headers = new HttpHeaders({
      Authorization: localStorage.getItem("token")
    });
    let options = { headers: headers };
    return options;
  }
}
