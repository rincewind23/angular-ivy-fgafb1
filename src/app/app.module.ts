import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { PortalModule } from "@angular/cdk/portal";

//---------------------------------
import { AppComponent } from "./app.component";
import { ConnectionListComponent } from "./connectionList.component";
import { EventListComponent } from "./eventList.component";
import { EventSubscriptionDialog } from "./dialogs/EventSubscription/eventSubscriptionDialog.component";
import { NewConnectionDialog } from "./dialogs/newConnectionDialog.component";
import { SubscriptionListComponent } from "./subscriptionList.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    PortalModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    EventSubscriptionDialog,
    ConnectionListComponent,
    EventListComponent,
    SubscriptionListComponent,
    NewConnectionDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
