import { ContractValidators } from './../../front-office/contract/create-contract/validators/contract.validators';
import { Component, OnInit, Inject } from '@angular/core';
import {Router, Params, ActivatedRoute} from '@angular/router';
import {UserStaffService} from "../../services/userStaff.service";
import 'rxjs/add/operator/switchMap';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {MD_DIALOG_DATA, MdDialog} from '@angular/material';

@Component({
    selector: 'app-userStaff-detail',
    templateUrl: 'userStaff-detail.component.html',
    styleUrls: ['userStaff-detail.component.css']
})

export class UserStaffDetailComponent implements OnInit {

    userInfos : any;
    userStaffForm : FormGroup;
    profileList : any[] = ['ADMIN', 'RH'];
    submitted = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private userStaffService: UserStaffService,
                private dialog : MdDialog,
                @Inject(MD_DIALOG_DATA) public data: any)
    {
        this.userInfos = data;
        this.userStaffForm = this.formBuilder.group({
            id: [data._id],
            email: [ data.email, Validators.compose([
                    Validators.required,
                    ContractValidators.checkEmail,
                    ContractValidators.emailAccent
                ])
            ],
            profile: [ data.profile, Validators.compose([
                    Validators.required
                ])
            ],
            firstName: [ data.firstName, Validators.compose([
                    Validators.required,
                    ContractValidators.notAccented,
                    ContractValidators.notPunctuation
                ])
            ],
            lastName: [ data.lastName, Validators.compose([
                    Validators.required,
                    ContractValidators.notAccented,
                    ContractValidators.notPunctuation
                ])
            ],
            newPassword: [ data.password],
        });
    }


    ngOnInit() {
    }


    saveUserStaff() {
        this.submitted = true;
        if(this.userStaffForm.valid) {
            this.userStaffService.saveUserStaff(this.userStaffForm.value).subscribe(res => {
                if (res.status === 200) {
                    this.dialog.closeAll();
                }
            })
        }
    }

    cancel() {
        this.router.navigate(['/bo/users']);
    }

}
