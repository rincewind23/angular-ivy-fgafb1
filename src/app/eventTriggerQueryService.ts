import { Injectable } from "@angular/core";
import axios from "axios";

export interface Trigger {
  id: string;
  name: string;
}

@Injectable({
  providedIn: "root"
})
export class EventTriggerQueryService {
  constructor() {}

  getTriggers(org): Promise<Trigger[]> {
    let retval: Trigger[] = [];
    return axios
      .post("https://idn-ets-dashboard.herokuapp.com/triggers", {
        org: org
      })
      .then(response => {
        // Response is an array of strings
        console.log(`${response.data}`);
        response.data.forEach(trigger => {
          let trig: Trigger = {
            id: trigger.id,
            name: trigger.name
          };
          retval.push(trig);
        });
        return retval;
      })
      .catch(error => {
        console.log(`Error: ${error}`);
        return retval;
      });
  }

  subscribe(org: string, triggerId: string): Promise<string> {
    let retval: string = "";
    return axios
      .post("https://idn-ets-dashboard.herokuapp.com/subscriptions/subscribe", {
        org: org,
        trigger: triggerId
      })
      .then(response => {
        // Response is an array of strings
        console.log(`${response.data}`);
        return retval;
      })
      .catch(error => {
        console.log(`Error: ${error}`);
        return retval;
      });
  }
}
