import { Component, OnInit, VERSION } from "@angular/core";

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
  lastEventTimestamp;

  connections = [];
  subscriptions = null;
  events: Event[] = [];

  getConnections() {
    axios.get(httpUrl + "/connections").then(response => {
      this.connections = response.data;
    });
  }

  getSubscriptions() {
    axios.get(httpUrl + "/subscriptions").then(response => {
      this.subscriptions = response.data;
    });
  }


  /** Get event list from the server */
  getEvents(since) {

    let url = httpUrl + "/events";
    if (since) url += "?since=" + since;

    return axios.get(url).then(response => {
      this.events = response.data;
      console.log(`events=${JSON.stringify(this.events)}`);
      if (this.events.length > 0) {
        this.lastEventTimestamp = this.events[this.events.length - 1].timestamp;
      }
    });
  }

  // Get events, and then set up a timer to query every 5 seconds
  setupEventsPoller() {

    return this.getEvents(events => {
      let timerId = setInterval(() => {
        return this.getEvents(this.lastEventTimestamp);
      }, 5000);
    });

  }

  ngOnInit() {
    this.getConnections();
    this.getSubscriptions();

    this.setupEventsPoller();

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
