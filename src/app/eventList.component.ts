import { Component, Input } from "@angular/core";

export interface Event {
  guid: string;
  date: Date;
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

  constructor() {}

  respond() {}
}
