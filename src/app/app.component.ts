import { Component, OnInit, VERSION } from "@angular/core";

import { Subscription } from "./subscriptionList.component";
import { Event } from "./eventList.component";
import { FullEvent } from "./eventPane.component";
import axios from "axios";

const httpUrl = "https://idn-ets-dashboard.herokuapp.com";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  lastEventTimestamp;

  connections = [];
  subscriptions = null;
  events: Event[] = [];
  selectedEvent: FullEvent;

  getConnections() {
    axios.get(httpUrl + "/connections").then(response => {
      this.connections = response.data;
    });
  }

  getEvents() {
    axios.get(httpUrl + "/events").then(response => {
      this.events = response.data;
      console.log(`events=${JSON.stringify(this.events)}`);
      if (this.events.length > 0) {
        this.lastEventTimestamp = this.events[this.events.length - 1].timestamp;
      }
    });
  }

  getSubscriptions() {
    axios.get(httpUrl + "/subscriptions").then(response => {
      console.log(`response=${JSON.stringify(response)}`);
      let subs = new Map<string, Subscription[]>();
      response.data.forEach(row => {
        console.log(JSON.stringify(row, null, 2));
        let org: Subscription[] = subs.get(row.org);
        if (!org) {
          org = [];
          subs.set(row.org, org);
        }
        org.push({
          id: row.subscriptionid,
          name: row.triggerid,
          checked: false
        } as Subscription);
        console.log(`subs=${JSON.stringify(subs, null, 2)}`);
      });
      this.subscriptions = subs;
      console.log(`subs=${JSON.stringify(subs, null, 2)}`);
    });
  }

  ngOnInit() {
    this.getConnections();
    this.getEvents();
    this.getSubscriptions();

    // let subs = new Map<string, Subscription[]>();
    // subs.set("enterprise103", [
    //   // new SubscriptionListComponent.subscription( checked: false, subscription: "IdentityCreated"),
    //   //new subscription( checked: false, subscription: "IdentityDeleted")
    // ]);
    // subs.set("enterprise104", [
    //   { checked: false, name: "AccessRequestSomething" },
    //   { checked: false, name: "SomeOtherthing" }
    // ]);
    // this.subscriptions = subs;
    // console.log(`keys: ${JSON.stringify(this.subscriptions)}`);
  }
}
