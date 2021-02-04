import { Component, Input } from "@angular/core";

export interface Event {
  guid: string;
  timestamp: Date;
  org: string;
}
@Component({
  selector: "eventList",
  templateUrl: "./templates/eventList.component.html",
  styleUrls: [
    "./templates/dashboardComponent.style.css",
    "./templates/eventList.style.css"
  ]
})
export class EventListComponent {
  @Input() events: Event[];

  displayedColumns: string[] = ["timestamp", "org", "event", "object"];

  constructor() {
    this.events = [];
  }

}
