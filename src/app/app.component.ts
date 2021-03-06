import { Component, OnInit, VERSION } from "@angular/core";

import { Subscription } from "./subscriptionList.component";
import { ETSEvent } from "./eventList.component";
import { FullEvent } from "./eventPane.component";
import { ViewEncapsulation } from "@angular/core";
import { SummaryItem, Summarizer } from "./summary.component";
import axios from "axios";

const httpUrl = "https://idn-ets-dashboard.herokuapp.com";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  lastEventTimestamp: Date;

  connections = [];
  subscriptions = null;
  events: ETSEvent[] = [];
  selectedEvent: FullEvent;
  selectedSummary: SummaryItem[];
  selectedEventID: string;
  fullEvents = {};
  summaryEvents = {};
  poller = null;

  getConnections() {
    axios.get(httpUrl + "/connections").then(response => {
      this.connections = response.data;
    });
  }

  /** Get event list from the server */
  getEvents(since: Date) {
    let url = httpUrl + "/events";
    if (since) url += "?since=" + since.getTime();

    return axios.get(url).then(response => {
      let newEvents: ETSEvent[] = response.data;
      if (newEvents.length > 0) {
        this.events = this.events.concat(newEvents);

        this.lastEventTimestamp = new Date(
          newEvents[newEvents.length - 1].tstamp
        );
      }
    });
  }

  // Get events, and then set up a timer to query every 5 seconds
  setupEventsPoller() {
    return this.getEvents(null).then(events => {
      this.poller = setInterval(() => {
        return this.getEvents(this.lastEventTimestamp);
      }, 5000);
    });
  }

  getEvent(guid) {
    return axios.get(httpUrl + "/events/" + guid).then(response => {
      let event = response.data;
      console.log(`event=${JSON.stringify(event)}`);
      this.fullEvents[guid] = event;
      this.summaryEvents[guid] = Summarizer.summarize(event);
    });
  }

  getSubscriptions() {
    axios.get(httpUrl + "/subscriptions").then(response => {
      let subs = new Map<string, Subscription[]>();
      response.data.forEach(row => {
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
      });
      this.subscriptions = subs;
    });
  }

  updateSelectedEvent(event) {
    console.log(`update: ${event}`);
    this.selectedEventID = event;
    if (this.fullEvents[event]) {
      this.selectedEvent = this.fullEvents[event];
      this.selectedSummary = this.summaryEvents[event];
      console.log(
        `(Cache)this.selectedSummary = ${JSON.stringify(this.selectedSummary)}`
      );
    } else {
      this.getEvent(event).then(ok => {
        this.selectedEvent = this.fullEvents[event];
        this.selectedSummary = this.summaryEvents[event];
        console.log(
          `this.selectedSummary = ${JSON.stringify(this.selectedSummary)}`
        );
        console.log(`selectedEvent: ${JSON.stringify(this.selectedEvent)}`);
      });
    }
    console.log(`selectedEvent: ${JSON.stringify(this.selectedEvent)}`);
  }

  ngOnInit() {
    this.getConnections();
    this.setupEventsPoller();
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

  ngOnDestroy() {
    // Clear any existing poller
    if (this.poller) {
      console.log(`clearing poller ${this.poller}`);
      clearInterval(this.poller);
      this.poller = null;
    }
  }
}
