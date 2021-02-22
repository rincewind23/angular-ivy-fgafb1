import { Injectable } from "@angular/core";
import axios from "axios";

@Injectable({
  providedIn: "root"
})
export class SubscriptionService {
  constructor() {}

  static subscribe(
    org: string,
    triggerid: string,
    action: string
  ): Promise<boolean> {
    if (!org) {
      throw "SubscriptionService.subscribe: org required";
    }
    if (!triggerid) {
      throw "SubscriptionService.subscribe: triggerid required";
    }
    if (!action) {
      throw "SubscriptionService.subscribe: action required";
    }
    return axios
      .post("https://idn-ets-dashboard.herokuapp.com/subscriptions/subscribe", {
        org: org,
        triggerid: triggerid,
        action: action
      })
      .then(response => {
        // Response is an array of strings
        console.log(`${response.data}`);
        return true;
      })
      .catch(error => {
        console.log(`Error: ${error}`);
        throw error;
      });
  }
}
