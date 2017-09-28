import { Routes } from '@angular/router';
import { FrontOfficeComponent } from "./front-office.component";
import { LogAsComponent } from "./log-as/log-as.component";
import {ListContractsComponent} from "./contract/list-contracts/list-contracts.component";
import {StepOneComponent} from "./contract/create-contract/step-one/step-one.component";
import {StepTwoComponent} from "./contract/create-contract/step-two/step-two.component";
import {StepThreeComponent} from "./contract/create-contract/step-three/step-three.component";
import {StepFourComponent} from "./contract/create-contract/step-four/step-four.component";
import {StepFiveComponent} from "./contract/create-contract/step-five/step-five.component";
import {StepSixComponent} from "./contract/create-contract/step-six/step-six.component";
import {StepSevenComponent} from "./contract/create-contract/step-seven/step-seven.component";
import {CreateContractComponent} from "./contract/create-contract/create-contract.component";
import {ContractComponent} from "./contract/contract.component";

export const frontOfficeRoutes: Routes = [
    {   path : '',
        component: FrontOfficeComponent,
        children : [
            {   path: '', pathMatch: 'full', redirectTo: 'logas'},
            {   path : 'logas', component: LogAsComponent},
            {
                path : 'contract', component: ContractComponent,
                children : [
                    {   path : 'list', component: ListContractsComponent},
                    {   path: 'create', component: CreateContractComponent},
                    {   path: 'step-one/:id', component: StepOneComponent},
                    {   path: 'step-two/:id', component: StepTwoComponent},
                    {   path: 'step-three/:id', component: StepThreeComponent},
                    {   path: 'step-four/:id', component: StepFourComponent},
                    {   path: 'step-five/:id', component: StepFiveComponent},
                    {   path: 'step-six/:id', component: StepSixComponent},
                    {   path: 'step-seven/:id', component: StepSevenComponent}
                ]
            },
        ]
    }
];
