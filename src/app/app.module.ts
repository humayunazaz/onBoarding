import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MdAutocompleteModule} from '@angular/material';
import { MdNativeDateModule } from '@angular/material';
import { AppComponent } from './app.component';
import { appRoutes } from "app/app.routing";
import { ImportService } from "./services/imports.service";
import { UserService } from "./services/users.service";
import { MessageService } from "./services/message.service";
import { ContractsService } from "./services/contracts.service";
import { ReferenceService } from "./services/references.service";
import { PictureReferenceService } from "./services/pictureReference.service";
import { LoginService } from "./services/login.service";
import { UserStaffService } from "./services/userStaff.service";
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
      AppComponent,
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      RouterModule.forRoot(appRoutes),
      BrowserAnimationsModule,
      MdAutocompleteModule,
      MdNativeDateModule
  ],
  bootstrap: [AppComponent],
  providers: [
      ImportService,
      UserService,
      MessageService,
      ContractsService,
      ReferenceService,
      LoginService,
      PictureReferenceService,
      UserStaffService,
      DatePipe
  ]
})
export class AppModule { }
