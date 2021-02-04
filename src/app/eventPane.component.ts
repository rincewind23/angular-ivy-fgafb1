import { Component, Input } from "@angular/core";
import { SummaryItem } from "./summary.component";
import { MatDialog } from "@angular/material/dialog";

import { EventResponseDialog } from "./dialogs/EventResponse/eventResponseDialog.component";

export interface FullEvent {
  event: object;
}

@Component({
  selector: "eventPane",
  templateUrl: "./templates/eventPane.component.html",
  styleUrls: [
    "./templates/dashboardComponent.style.css",
    "./templates/eventPane.style.css"
  ]
})
export class EventPaneComponent {
  @Input() event: FullEvent;
  @Input() summary: SummaryItem[];

  displayedColumns: string[] = ["field", "value"];

  constructor(public dialog: MatDialog) {}

  isRespondable() {
    if (!this.event) return false;
    let meta = this.event["_metadata"];
    if (!meta) return false;
    if (meta.triggerType == "requestResponse") return true;
    return false;
  }

  doResponse() {
    console.log("Show Response Dialog");
    const dialogRef = this.dialog.open(EventResponseDialog, {
      height: "400px",
      width: "600px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      console.log(JSON.stringify(result, null, 2));
    });
  }
}
