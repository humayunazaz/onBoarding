import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { BackOfficeComponent } from "app/back-office/back-office.component";
import { ImportComponent } from './import/import.component';
import { backOfficeRoutes } from "./back-office.routing";
import { PackListComponent } from "./list-packs/list-packs.component";
import { UserStaffListComponent } from "./userStaff/userStaff-list.component";
import { UserStaffDetailComponent } from "./userStaff/userStaff-detail.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import { HeaderComponent } from './header/header.component';
import {MdDialogModule} from '@angular/material';
import {UserStaffCreateComponent} from "./userStaff/userStaff-create.component";
import {UploadComponent} from "./list-packs/upload.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(backOfficeRoutes),
        MdDialogModule
    ],
    declarations: [
        BackOfficeComponent,
        ImportComponent,
        PackListComponent,
        UserStaffListComponent,
        UserStaffDetailComponent,
        LoginComponent,
        HeaderComponent,
        UserStaffCreateComponent,
        UploadComponent
    ],
    entryComponents: [
        UserStaffCreateComponent,
        UploadComponent
    ]
})

export class BackOfficeModule { }
