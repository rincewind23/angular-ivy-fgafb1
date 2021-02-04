import { Component, Input } from "@angular/core";
import { SummaryItem } from "./summary.component";
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
  @Input() summary: SummaryItem[];

  displayedColumns: string[] = ["field", "value"];

  constructor() {}

  isRespondable() {
    if (!this.event) return false;
    let meta = this.event["_metadata"];
    if (!meta) return false;
    if (meta.triggerType == "requestResponse") return true;
    return false;
  }

  doResponse() {
    
  }
}
