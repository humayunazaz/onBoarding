import { Routes } from '@angular/router';
import {BackOfficeComponent} from "./back-office.component";
import {ImportComponent} from "./import/import.component";
import {UserStaffListComponent} from "./userStaff/userStaff-list.component";
import {UserStaffDetailComponent} from "./userStaff/userStaff-detail.component";
import {PackListComponent} from "./list-packs/list-packs.component";
import {LoginComponent} from "./login/login.component";
import {HeaderComponent} from "./header/header.component";

export const backOfficeRoutes: Routes = [
    {
        path: '',
        component: BackOfficeComponent,
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'login'},
            {path: 'login', component: LoginComponent},
            {
                path: '', component: HeaderComponent,
                children: [
                    {path: 'import', component: ImportComponent},
                    {path: 'list-packs', component: PackListComponent},
                    {path: 'users', component: UserStaffListComponent},
                    {path: 'user/:id', component: UserStaffDetailComponent},
                    {path: 'new-user', component: UserStaffDetailComponent}
                ]
            },
        ]
    }
];