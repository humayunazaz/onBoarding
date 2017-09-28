import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path: '', loadChildren: 'app/front-office/front-office.module#FrontOfficeModule' },
    { path: 'bo', loadChildren: 'app/back-office/back-office.module#BackOfficeModule' }
];
