import { Component, Input } from "@angular/core";
import { NewConnectionDialog } from "./dialogs/newConnectionDialog.component";
import { MatDialog } from "@angular/material/dialog";

export interface Connection {
  checked: boolean;
  org: string;
  client_id: string;
}

@Component({
  selector: "connectionList",
  templateUrl: "./templates/connectionList.component.html",
  styleUrls: [
    "./templates/dashboardComponent.style.css",
    "./templates/connectionList.style.css"
  ]
})
export class ConnectionListComponent {
  @Input() connections: Connection[];

  constructor(public dialog: MatDialog) {}

  anySelected: boolean = false;

  /**
   * remoteSelected() - instruct the server to remove the selected org connection(s)
   */
  removeSelected() {
    console.log("Remove Selected Orgs");
  }

  /**
   * showAddDialog() - show the add connection dialog
   */
  showAddDialog() {
    console.log("Show Add Dialog");
    const dialogRef = this.dialog.open(NewConnectionDialog, {
      height: "400px",
      width: "600px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      console.log(JSON.stringify(result, null, 2));
      if (result.connection) {
        this.connections.push(result.connection);
      }
    });
  }

  checkChanged() {
    console.log("checkChanged");
    let selected = false;
    this.connections.some(connection => {
      if (connection.checked) {
        console.log("something is selected");
        selected = true;
        return true;
      }
    });
    if (!selected) {
      console.log("nothing is selected");
    }
    this.anySelected = selected;
  }
}
