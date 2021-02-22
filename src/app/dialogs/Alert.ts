import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Connection } from "../connectionList.component";
import { ConnectionService } from "../connectionService";

@Component({
  template: "<h1>${message}</h1>",
  styleUrls: ["./style.css"]
})
export class AlertDialog {
  message: string;

  constructor(public dialogRef: MatDialogRef<AlertDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  static alert(message) {
    dlg =this.dialog.open(AlertDialog();
  }


}
