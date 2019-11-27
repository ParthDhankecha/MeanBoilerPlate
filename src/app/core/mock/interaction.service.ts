import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class InteractionService {
  constructor() {}

  private loader = new Subject<any>();

  loader$ = this.loader.asObservable();

  changeProgress(status) {
    this.loader.next(status);
  }
}
