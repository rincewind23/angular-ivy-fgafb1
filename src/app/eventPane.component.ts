import { Component, Input } from "@angular/core";

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

  constructor() {}
}
