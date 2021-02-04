import { Injectable } from "@angular/core";
import axios from "axios";

export interface Action {
  trigger: string;
  name: string;
  label: string;
}

@Injectable({
  providedIn: "root"
})
export class ActionQueryService {
  constructor() {}

  static getActions(): Promise<Action[]> {
    let retval: Action[] = [];
    return axios
      .get("https://idn-ets-dashboard.herokuapp.com/actions")
      .then(response => {
        // Response is an array of strings
        console.log(`${response.data}`);
        response.data.forEach(action => {
          retval.push(action as Action);
        });
        return retval;
      })
      .catch(error => {
        console.log(`Error: ${error}`);
        return retval;
      });
  }
}
