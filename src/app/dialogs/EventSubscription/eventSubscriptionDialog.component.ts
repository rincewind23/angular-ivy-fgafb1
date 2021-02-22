import { Component, Inject } from "@angular/core";
import { Connection } from "../../connectionList.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  EventTriggerQueryService,
  Trigger
} from "../../eventTriggerQueryService";
import { Action, ActionQueryService } from "../../actionQueryService";

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
  availableActions: Action[];
  actions: Action[];

  selectedOrg: string;
  selectedTrigger: string;
  selectedAction: string;
  triggerPlaceholder: string;
  actionPlaceholder = "select a trigger first";

  constructor(
    public dialogRef: MatDialogRef<EventSubscriptionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EventSubscriptionData
  ) {
    this.triggerPlaceholder = "";
    console.log(`connections=${JSON.stringify(data.connections)}`);
    this.connections = data.connections;
    this.etqs = new EventTriggerQueryService();
    ActionQueryService.getActions().then(actions => {
      this.actions = actions;
      this.availableActions = [];
    });
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

  onTriggerChange(event) {
    console.log(`trigger change: ${event.value}`);
    this.availableActions = [];
    this.actions.forEach(action => {
      console.log(`checking ${action.trigger} against ${event.value}`);
      if (action.trigger == "*" || action.trigger == event.value) {
        this.availableActions.push(action);
        this.actionPlaceholder = "Select an action";
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  subscribe() {
    return this.etqs.subscribe(
      this.selectedOrg,
      this.selectedTrigger,
      this.selectedAction
    );
  }
}
