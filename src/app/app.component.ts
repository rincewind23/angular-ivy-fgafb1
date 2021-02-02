import { Component, OnInit, VERSION } from "@angular/core";

import { Connection } from "./connectionList.component";
import { SubscriptionListComponent } from "./subscriptionList.component";
import { Subscription } from "./subscriptionList.component";
import { Event } from "./eventList.component";
import axios from "axios";

const httpUrl = "https://idn-ets-dashboard.herokuapp.com";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  connections = [];
  subscriptions = null;
  events: Event[] = [];
  ngOnInit() {
    axios.get(httpUrl + "/connections").then(response => {
      this.connections = response.data;
    });

    axios.get(httpUrl + "/events").then(response => {
      this.events = response.data;
    });

    let subs = new Map<string, Subscription[]>();
    subs.set("enterprise103", [
      // new SubscriptionListComponent.subscription( checked: false, subscription: "IdentityCreated"),
      //new subscription( checked: false, subscription: "IdentityDeleted")
    ]);
    subs.set("enterprise104", [
      { checked: false, name: "AccessRequestSomething" },
      { checked: false, name: "SomeOtherthing" }
    ]);
    this.subscriptions = subs;
    console.log(`keys: ${JSON.stringify(this.subscriptions)}`);
  }
}
