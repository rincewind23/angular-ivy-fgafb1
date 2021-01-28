import { Component, Inject } from "@angular/core";
import { Connection } from "../../connectionList.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  EventTriggerQueryService,
  Trigger
} from "../../eventTriggerQueryService";

export interface EventSubscriptionData {
  connections: Connection[];
  org: string;
  event: string;
}
@Component({
  templateUrl: "./eventSubscriptionDialog.component.html",
  styleUrls: ["./style.css"]
})
export class EventSubscriptionDialog {
  connections: Connection[];
  triggerTypes: Trigger[];
  etqs: EventTriggerQueryService;

  selectedOrg: Connection;
  selectedTrigger: Trigger;
  triggerPlaceholder: string;

  constructor(
    public dialogRef: MatDialogRef<EventSubscriptionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EventSubscriptionData
  ) {
    this.triggerPlaceholder = "";
    console.log(`connections=${JSON.stringify(data.connections)}`);
    this.connections = data.connections;
    this.etqs = new EventTriggerQueryService();
  }

  onOrgChange(event) {
    console.log(`org change: ${event.value}`);
    this.triggerTypes = [];
    this.selectedTrigger = null;
    this.triggerPlaceholder = "Loading..";

    this.etqs.getTriggers(event.value).then(triggers => {
      console.log(`triggers=${JSON.stringify(triggers)}`);
      this.triggerTypes = triggers;
      this.triggerPlaceholder = "Select Trigger type";
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  subscribe(org: any, triggerId: any) {
    console.log(`subscribe: ${org}`);
    console.log(`triggerId: ${triggerId}`);
    this.etqs.subscribe(org, triggerId);
  }
}
