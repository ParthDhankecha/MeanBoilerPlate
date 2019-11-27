import { Component, OnInit } from "@angular/core";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { InteractionService } from "src/app/core/mock/interaction.service";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {
  @BlockUI("block-content") blockUI: NgBlockUI;
  constructor(private _interactionService: InteractionService) {}

  ngOnInit() {
    this._interactionService.loader$.subscribe(status => {
      if (status) {
        this.blockUI.start("Loading");
      } else {
        this.blockUI.stop();
      }
    });
  }
}
