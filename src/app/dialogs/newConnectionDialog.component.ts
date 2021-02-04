import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Connection } from "../connectionList.component";

import axios from "axios";
@Component({
  templateUrl: "./newConnectionDialog.component.html",
  styleUrls: ["./style.css"]
})
export class NewConnectionDialog {
  newOrg: string;
  newID: string;
  newSecret: string;

  constructor(public dialogRef: MatDialogRef<NewConnectionDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addConnection() {
    console.log(`org: ${this.newOrg}`);
    console.log(`id: ${this.newID}`);
    console.log(`secret: ${this.newSecret}`);

    let connection = {
      checked: false,
      org: this.newOrg,
      client_id: this.newID
    } as Connection;

    axios.post("/connections", {
      org: this.newOrg,
      clientid: this.newID,
      secret: this.newSecret
    }).then(response => {
      this.dialogRef.close({
        connection: connection
      })
    }, error => {
      console.log(`Error: ${error}`);
    });
  }

  valid() {
    if (!this.newOrg) return false;
    if (!this.newID) return false;
    if (!this.newSecret) return false;
    return true;
  }
}
