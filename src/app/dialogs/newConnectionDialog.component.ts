import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ConnectionService } from "../connectionService";
import axios from "axios";
@Component({
  templateUrl: "./newConnectionDialog.component.html",
  styleUrls: ["./style.css"]
})
export class NewConnectionDialog {
  newOrg: string;
  newID: string;
  newSecret: string;
  connectionError: string;
  statusMessage: string;

  constructor(public dialogRef: MatDialogRef<NewConnectionDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addConnection() {
    console.log(`org: ${this.newOrg}`);
    console.log(`id: ${this.newID}`);
    console.log(`secret: ${this.newSecret}`);

    this.connectionError = null;
    this.statusMessage = "Connecting..";

    ConnectionService.connect(this.newOrg, this.newID, this.newSecret).then(
      response => {
        this.dialogRef.close({
          connection: response
        });
      },
      error => {
        console.log(`Error: ${error}`);
        this.statusMessage = null;
        this.connectionError = error;
      }
    );
  }

  valid() {
    if (!this.newOrg) return false;
    if (!this.newID) return false;
    if (!this.newSecret) return false;
    return true;
  }
}
