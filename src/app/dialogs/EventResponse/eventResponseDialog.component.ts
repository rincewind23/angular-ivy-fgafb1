import { Component, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  templateUrl: "./eventResponseDialog.component.html",
  styleUrls: ["./style.css"]
})
export class EventResponseDialog {
  @Input() approved: boolean;
  @Input() comment: string;
  @Input() approver: string;

  constructor(public dialogRef: MatDialogRef<EventResponseDialog>) {}
}
