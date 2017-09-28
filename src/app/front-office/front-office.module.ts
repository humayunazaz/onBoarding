import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MdAutocompleteModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import { Ng2CompleterModule } from "ng2-completer";
import {MdDialogModule} from '@angular/material';
import { FrontOfficeComponent } from "./front-office.component";
import { frontOfficeRoutes } from "./front-office.routing";
import { LogAsComponent } from "./log-as/log-as.component";
import { ListContractsComponent } from "./contract/list-contracts/list-contracts.component";
import { DdzmComponent } from './contract/list-contracts/ddzm/ddzm.component';
import { CoachComponent } from './contract/list-contracts/coach/coach.component';
import { RecruitComponent } from './contract/list-contracts/recruit/recruit.component';
import { StepSevenComponent } from "./contract/create-contract/step-seven/step-seven.component";
import { StepSixComponent } from "./contract/create-contract/step-six/step-six.component";
import { StepFiveComponent } from "./contract/create-contract/step-five/step-five.component";
import { StepFourComponent } from "./contract/create-contract/step-four/step-four.component";
import { StepThreeComponent } from "./contract/create-contract/step-three/step-three.component";
import { StepTwoComponent } from "./contract/create-contract/step-two/step-two.component";
import { StepOneComponent } from "./contract/create-contract/step-one/step-one.component";
import { CreateContractComponent } from "./contract/create-contract/create-contract.component";
import { ContractComponent } from './contract/contract.component';
import {MdDatepickerModule} from '@angular/material';
import { UppercaseDirective } from './contract/create-contract/directives/uppercase.directive';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(frontOfficeRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdAutocompleteModule,
        MdInputModule,
        Ng2CompleterModule,
        MdDialogModule,
        MdDatepickerModule
    ],
    declarations: [
        FrontOfficeComponent,
        LogAsComponent,
        ListContractsComponent,
        DdzmComponent,
        CoachComponent,
        RecruitComponent,
        StepOneComponent,
        StepTwoComponent,
        StepThreeComponent,
        StepFourComponent,
        StepFiveComponent,
        StepSixComponent,
        StepSevenComponent,
        CreateContractComponent,
        ContractComponent,
        UppercaseDirective
    ]
})
export class FrontOfficeModule { }
