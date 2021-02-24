import { Component, Input } from "@angular/core";
import { Connection } from "./connectionList.component";
import { EventSubscriptionDialog } from "./dialogs/EventSubscription/eventSubscriptionDialog.component";
import { MatDialog } from "@angular/material/dialog";
import { SubscriptionService } from "./subscriptionService";

export interface Subscription {
  checked: boolean;
  name: string;
  id: string;
}
@Component({
  selector: "subscriptionList",
  templateUrl: "./templates/subscriptionList.component.html",
  styleUrls: [
    "./templates/dashboardComponent.style.css",
    "./templates/subscriptionList.style.css"
  ]
})
export class SubscriptionListComponent {
  @Input() subscriptions: Map<string, Array<Subscription>>;
  @Input() connections: Connection[];

  constructor(public dialog: MatDialog) {}

  anySelected: boolean = false;

  orgs() {
    if (!this.subscriptions) return [];
    return Array.from(this.subscriptions.keys());
  }

  checkChanged() {
    let selected = false;
    this.subscriptions.forEach((val, key) => {
      val.forEach(subscription => {
        if (subscription.checked) {
          selected = true;
        }
      });
    });
    this.anySelected = selected;
  }

  /**
   * showSubscribeDialog()
   * Shows the subscribe to new event dialog
   */
  showSubscribeDialog() {
    console.log("Show Subscribe Dialog");
    const dialogRef = this.dialog.open(EventSubscriptionDialog, {
      height: "400px",
      width: "600px",
      data: { org: null, event: null, connections: this.connections }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      console.log(JSON.stringify(result, null, 2));
      this.addTriggerSubscription(result.org, result.trigger);
    });
  }

  /**
   * removeSelected()
   * Removes selected event subscriptions
   */
  removeSelected() {
    console.log("Remove selected subscriptions");
    let toRemove = [];
    this.subscriptions.forEach((value: Subscription[], key: string) => {
      value.forEach(subscription => {
        if (subscription.checked) {
          toRemove.push({
            org: key,
            subscriptionId: subscription.id
          });
        }
      });
    });
    return SubscriptionService.unsubscribe(toRemove);
  }

  addTriggerSubscription(org: string, id: string) {
    // do the REST call
    if (this.subscriptions.get(org) == null) {
      this.subscriptions.set(org, []);
    }
    this.subscriptions.get(org).push({
      checked: false,
      name: id,
      id: "x"
    });
  }
}
