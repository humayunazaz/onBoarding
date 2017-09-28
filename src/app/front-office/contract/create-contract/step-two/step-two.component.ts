import { UserService } from './../../../../services/users.service';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {StepTwoModel} from "./step-two.model";
import {Router, ActivatedRoute} from "@angular/router";
import {ContractsService} from "../../../../services/contracts.service";
import {ReferenceService} from "../../../../services/references.service";
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import { ContractValidators } from '../validators/contract.validators';
import {URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
declare var jQuery: any;

@Component({
    selector: 'app-step-two',
    templateUrl: 'step-two.component.html',
    styleUrls: ['step-two.component.css'],
})
export class StepTwoComponent implements OnInit {

    model: StepTwoModel;
    contract: any;
    submitted = false;

    id: string;
    form : FormGroup;
    filteredStates: any;
    filteredZips: any;
    cities;
    zipCodes;
    user;
    validationInformation = [
        {
            value: 'Nº de rue',
            control: 'addrAddress1_number'
        },
        {
            value: 'Nom de la rue',
            control: 'addrAddress1_name'
        },
        {
            value: 'Code postal',
            control: 'addrCodePostal'
        },
        {
            value: 'Ville ou commune',
            control: 'addrCity'
        }
    ]

    constructor(private router: Router,
                private route: ActivatedRoute,
                private contractsService: ContractsService,
                private formBuilder: FormBuilder,
                private referenceService: ReferenceService,
                private userService:UserService
    ) {

        this.form = this.formBuilder.group({
            addrAddress1_name : ['', Validators.compose([
                Validators.required,
                ContractValidators.notAccented,
                ContractValidators.notPunctuation
            ])],
            addrAddress1_number : ['', Validators.required],
            addrAddress2 : ['', Validators.compose([
                ContractValidators.notAccented,
                ContractValidators.notPunctuation
            ])],
            addrAddress3 : ['', Validators.compose([
                ContractValidators.notAccented,
                ContractValidators.notPunctuation
            ])],
            addrCodePostal: ['', Validators.compose([
                Validators.required,
                ContractValidators.checkNumber
            ])],
            addrCity: ['', Validators.required],
            addrAddress1: '',
            numberStep: '',
            ctxList: '',
            isStepTwoComplete: ''
        });

    }


    ngOnInit() {

        this.route.params.subscribe(params => {
            let id = params['id'];
            this.id = id;
            if (!id) {
                console.error('id required');
            } else {
                this.contractsService.getContractById(id).subscribe(function (contract) {
                    this.contract = contract;
                    // this.contract['isRecorded'] = true;
                    // this.contract['isSigned'] = false;
                    this.model = new StepTwoModel(contract);
                    this.form.setValue({
                        addrAddress1_name : this.model.addrAddress1_name,
                        addrAddress1_number : this.model.addrAddress1_number,
                        addrAddress2 : this.model.addrAddress2,
                        addrAddress3 : this.model.addrAddress3,
                        addrCodePostal: this.model.addrCodePostal,
                        addrCity: this.model.addrCity,
                        addrAddress1 : this.model.addrAddress1,
                        numberStep: 2,
                        ctxList: this.model.ctxList,
                        isStepTwoComplete: false
                    });
                }.bind(this))

            }
        });

        this.form.controls['addrCodePostal'].valueChanges.subscribe(
            data => {
                if (data) {
                    if (data.length >= 2) {
                        let params = new URLSearchParams();
                        params.append("zipcode", data);
                        this.referenceService.search(params).subscribe(
                            res => {
                                res = res.json();
                                this.cities = res;
                                let i = 0;
                                this.filteredZips = [];
                                while (res[i]) {
                                    this.filteredZips.push(res[i].zipCode);
                                    i++;
                                }
                            }
                        );
                    }
                }
            }
        );

        this.form.controls['addrCity'].valueChanges.subscribe(
            data => {
                if (data) {
                    if (data.length >= 2) {
                        let params = new URLSearchParams();
                        params.append("city", data);
                        this.referenceService.search(params).subscribe(
                            res => {
                                res = res.json();
                                this.zipCodes = res;
                                let i = 0;
                                this.filteredStates = [];
                                while(res[i]){
                                    this.filteredStates.push(res[i].city);
                                    i++;
                                }
                            }
                        );
                    }
                }
            }
        );

        this.userService.getMe().subscribe(
            (user) => {
                this.user = user;
                // this.user.profile = 'recrue';
                console.log(this.user);
            },
            (error) => {
                this.router.navigate(['/logas'])
            }
        );
    }

    submit() {
        this.submitted = true;
        let control = ['addrAddress1_number', 'addrAddress2', 'addrAddress3', 'addrAddress1_name'];
        for(let i = 0; i < control.length; i++){
            if(this.form.controls[control[i]].value != null){
                this.form.controls[control[i]].setValue(this.form.controls[control[i]].value.toUpperCase());
            }
        }
        this.form.value.addrAddress1 = this.form.value.addrAddress1_number + ' ' + this.form.value.addrAddress1_name;
        if(this.form.valid){
            this.form.controls['isStepTwoComplete'].setValue(true);
        } else{
            this.form.controls['isStepTwoComplete'].setValue(false);
        }
        this.contractsService.updateContract(this.contract._id, this.form.value).subscribe(function (contract) {
            if (contract.status == 200) {
                this.router.navigate(['contract/step-three', contract.data._id]);
            } else if (contract.status == 207) {

            }

        }.bind(this));
    }

    updateCities(value){
        if(this.form.controls[value].value != null && this.form.controls[value].value != ''){
            if(value == 'addrCodePostal'){
                let a = 0;
                while(this.cities[a]){
                    if(this.cities[a].zipCode == this.form.controls[value].value){
                        this.form.controls['addrCity'].setValue(this.cities[a].city);
                    }
                    a++;
                }
            } else{
                let a = 0;
                while(this.zipCodes[a]){
                    if(this.zipCodes[a].city == this.form.controls[value].value){
                        this.form.controls['addrCodePostal'].setValue(this.zipCodes[a].zipCode);
                    }
                    a++;
                }
            }
        }
    }

}
