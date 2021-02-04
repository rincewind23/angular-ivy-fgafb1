import { Component, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  templateUrl: "./eventResponseDialog.component.html",
  styleUrls: ["./style.css"]
})
export class EventResponseDialog {
  approved: boolean;
  comment: string;
  approver: string;

  constructor(public dialogRef: MatDialogRef<EventResponseDialog>) {
    this.comment = "";
    this.approver = "";
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onRespond(): void {}
}
