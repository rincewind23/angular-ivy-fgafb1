export interface SummaryItem {
  label: string;
  value: string;
}

function item(label, value) {
  return { label: label, value: value } as SummaryItem;
}

export class Summarizer {
  static summarize(event: Record<string, any>) {
    let eventType = event._metadata.triggerId;

    let ret: SummaryItem[] = [item("Event Type", eventType)];

    switch (eventType) {
      case "idn:saved-search-complete":
        ret.push(item("Filename", event.fileName));
        ret.push(item("Owner Email", event.ownerEmail));
        ret.push(item("Owner Name", event.ownerName));
        ret.push(item("Query", event.query));
        ret.push(item("Search Name", event.searchName));
        break;
      case "idn:access-request-pre-approval":
        ret.push(item("Requested By", event.requestedBy.name));
        ret.push(item("Requested For", event.requestedFor.name));
        ret.push(item("Request", event.requestedItems[0].operation+" "+event.requestedItems[0].name));
        if (event.requestedItems[0].comment) {
          ret.push(item("Comment", event.requestedItems[0].comment));
        }
        break;
      default:
        ret.push(item("summary", "Unhandled event type"));
        ret.push(item("error", "Unable to summarize"));
        break;
    }
    console.log(`Summarizer: returning ${JSON.stringify(ret)}`);
    return ret;
  }
}
