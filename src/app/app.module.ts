import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";

//---------------------------------
import { AppComponent } from "./app.component";
import { ConnectionListComponent } from "./connectionList.component";
import { EventListComponent } from "./eventList.component";
import { EventSubscriptionDialog } from "./dialogs/EventSubscription/eventSubscriptionDialog.component";
import { NewConnectionDialog } from "./Connection/newConnectionDialog.component";
import { SubscriptionListComponent } from "./subscriptionList.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule
  ],
  declarations: [
    AppComponent,
    EventSubscriptionDialog,
    ConnectionListComponent,
    EventListComponent,
    SubscriptionListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
