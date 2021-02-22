import { Injectable } from "@angular/core";
import axios from "axios";

import { Connection } from "./connectionList.component";

@Injectable({
  providedIn: "root"
})
export class ConnectionService {
  constructor() {}

  static connect(org, clientid, secret): Promise<Connection> {
    if (!org) {
      throw "ConnectionService.subscribe: org required";
    }
    if (!clientid) {
      throw "SubscriptionService.subscribe: clientid required";
    }
    if (!secret) {
      throw "SubscriptionService.subscribe: secret required";
    }
    return axios
      .post("https://idn-ets-dashboard.herokuapp.com/connections", {
        org: org,
        clientid: clientid,
        secret: secret
      })
      .then(response => {
        // Response is a connection object
        console.log(`${response.data}`);
        return {
          checked: false,
          org: org,
          client_id: clientid
        } as Connection;
      })
      .catch(error => {
        console.log(`Error: ${error}`);
        throw error;
      });
  }
}
