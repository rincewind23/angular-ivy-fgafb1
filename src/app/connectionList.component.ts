import { Component, Input } from "@angular/core";

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
