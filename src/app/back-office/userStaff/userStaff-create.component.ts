import { ContractValidators } from './../../front-office/contract/create-contract/validators/contract.validators';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {UserStaffService} from "../../services/userStaff.service";
import {MdDialog} from "@angular/material";

@Component({
    selector: 'app-userStaff-create',
    templateUrl: 'userStaff-create.component.html',
    styleUrls: ['userStaff-create.component.css']
})
export class UserStaffCreateComponent implements OnInit {

    userStaffForm : FormGroup;
    profileList : any[] = ['ADMIN', 'RH'];
    submitted = false;
    message = false;
    constructor(private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private userStaffService: UserStaffService,
                private dialog : MdDialog)
    {
        this.userStaffForm = this.formBuilder.group({
            email: [ '', Validators.compose([
                Validators.required,
                ContractValidators.checkEmail,
                ContractValidators.emailAccent
            ])],
            password : ['',
                [
                    Validators.required
                ]

            ],
            profile: [ '',
                [
                    Validators.required
                ]
            ],
            firstName: [ '', Validators.compose([
                Validators.required,
                ContractValidators.notAccented,
                ContractValidators.notPunctuation,
            ])],
            lastName: ['', Validators.compose([
                Validators.required,
                ContractValidators.notAccented,
                ContractValidators.notPunctuation,
            ])]
        });

        this.userStaffForm.controls['email'].valueChanges.subscribe(
            data => {
                this.message = false;
            }
        )
    }

    ngOnInit() {

    }

    saveUserStaff() {
        this.submitted = true;
        if(this.userStaffForm.valid){
            this.userStaffService.saveUserStaff(this.userStaffForm.value).subscribe(res => {
                if (res.status === 200) {
                    this.dialog.closeAll();
                }
                else if (res.status === 207) {
                    this.message = true;
                }
            });
        }
        
    }

    cancel() {
        this.router.navigate(['/bo/users']);
    }

}