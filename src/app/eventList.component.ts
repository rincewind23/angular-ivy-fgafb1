import { Component, EventEmitter, Input, Output } from "@angular/core";

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
  @Output() selectionChange = new EventEmitter();

  selectedRowIndex = -1;

  displayedColumns: string[] = ["timestamp", "org", "event", "object"];

  constructor() {
    this.events = [];
  }

  highlight(row) {
    console.log(`Highlight: ${row.guid}`);
    this.selectedRowIndex = row.guid;
    this.selectionChange.emit(row.guid);
  }
}
