import {Component, OnInit, ViewEncapsulation, AfterViewInit, Directive} from '@angular/core';
import {StepOneModel} from "../step-one/step-one.model";
import {Router, ActivatedRoute} from "@angular/router";
import {ContractsService} from "../../../../services/contracts.service";
import {ReferenceService} from "../../../../services/references.service";
import {Validators, FormGroup, FormBuilder, AbstractControl, ValidationErrors} from "@angular/forms";
import { DatePipe } from '@angular/common';
import { ContractValidators } from '../validators/contract.validators';
import {UserService} from "../../../../services/users.service";
import {URLSearchParams} from '@angular/http';
import { DateAdapter } from '@angular/material';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

declare var jQuery: any;

@Component({
    selector: 'app-step-one',
    templateUrl: 'step-one.component.html',
    styleUrls: ['step-one.component.css'],
})
export class StepOneComponent implements OnInit {

    model: StepOneModel;
    contract: any;
    submitted = false;
    listNationality: any;
    listCivility : any;
    listSituationFamily : any;
    listZipCode : any;
    id: string;
    form : FormGroup;
    filteredStates: any;
    filteredZips: any;
    zipCode:any;
    exist : boolean = false;
    validationInformation = [
        {
            value: 'Type de contrat',
            control: 'typeContract'
        },
        {
            value: 'Email',
            control: 'addrEmail'
        },
        {
            value: 'Civilité',
            control: 'civCodeCivilite'
        },
        {
            value: 'Nom',
            control: 'lastName'
        },
        {
            value: 'Prénom',
            control: 'firstName'
        },
        {
            value: 'Situation de famille',
            control: 'familySituation'
        },
        {
            value: 'Premier numéro',
            control: 'addrNumCellular'
        },
        {
            value: 'Numéro de sécurité',
            control: 'secuSocialNumber'
        },
        {
            value: 'Date de naissance',
            control: 'birthDate'
        },
        {
            value: 'CP de naissance',
            control: 'civCodePostalBirth'
        },
        {
            value: 'Nationalité',
            control: 'codeNationality'
        }
    ]
    cities;
    zipCodes;
    message:any = null;
    error;
    errorAttribute:any = '';
    checkSubmit;
    emailError = false;
    generalBlock = false;
    blockEmail = false;
    blockCell = false;
    blockSecu = false;
    blockPhone = false;
    user;
    constructor(private router: Router,
                private route: ActivatedRoute,
                private contractsService: ContractsService,
                private referenceService : ReferenceService,
                private formBuilder: FormBuilder,
                private datepipe: DatePipe,
                private userService:UserService,
                private dateAdapter: DateAdapter<Date>
        ,
    ) {

        this.form = this.formBuilder.group({
            addrEmail: ['', Validators.compose([
                Validators.required,
                ContractValidators.checkEmail
            ])],
            civCodeCivilite: ['', Validators.required],
            lastName: ['', Validators.compose([
                Validators.required,
                ContractValidators.notAccented,
                ContractValidators.notPunctuation
            ])],
            firstName: ['', Validators.compose([
                Validators.required,
                ContractValidators.notAccented,
                ContractValidators.notPunctuation
            ])],
            civMaidenName: ['', Validators.compose([
                Validators.required,
                ContractValidators.notAccented,
                ContractValidators.notPunctuation
            ])],
            addrNumCellular: ['', Validators.compose([
                Validators.required,
                ContractValidators.checkNumber,
                ContractValidators.mustbeTenDigits
            ])],
            addrNumPhone: ['', Validators.compose([
                ContractValidators.checkNumber,
                ContractValidators.mustbeTenDigits
            ])],
            secuSocialNumber: ['', Validators.compose([
                Validators.required,
                ContractValidators.checkNumber,
                ContractValidators.checkSecu
            ])],
            birthDate: ['', Validators.compose([
                Validators.required,
                ContractValidators.checkMajor
            ])],
            civCodePostalBirth: ['', Validators.compose([
                Validators.required,
                ContractValidators.checkNumber
            ])],
            civCityBirth:['', Validators.required],
            codeNationality:['', Validators.required],
            numberResidentPermit:['', Validators.required],
            dateValidationResidentPermit: ['', Validators.compose([
                Validators.required,
                ContractValidators.validateDate
            ])],
            isCivilServant:'',
            familySituation:['', Validators.required],
            isFrench: '',
            isBornInFrance: '',
            codeCountryBirthForeign: '',
            numberStep: '',
            isStepOneComplete: '',
            ctxList: '',
            typeContract: ['', Validators.required]
        }, {
            validator: ContractValidators.checkSecu}
        );
        this.dateAdapter.setLocale('fr');
    }


    ngOnInit(): void {

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
                    this.model = new StepOneModel(contract);
                    this.form.setValue({
                        addrEmail : this.model.addrEmail,
                        civCodeCivilite : this.model.civCodeCivilite,
                        lastName : this.model.lastName.toUpperCase(),
                        civMaidenName: this.model.civMaidenName,
                        firstName : this.model.firstName.toUpperCase(),
                        addrNumCellular: this.model.addrNumCellular,
                        addrNumPhone: this.model.addrNumPhone,
                        secuSocialNumber: this.model.secuSocialNumber,
                        birthDate: this.datepipe.transform(this.model.birthDate, 'yyyy-MM-dd'),
                        civCodePostalBirth: this.model.civCodePostalBirth,
                        civCityBirth: this.model.civCityBirth,
                        codeNationality: this.model.codeNationality,
                        numberResidentPermit: this.model.numberResidentPermit,
                        dateValidationResidentPermit: this.datepipe.transform(this.model.dateValidationResidentPermit, 'yyyy-MM-dd'),
                        isCivilServant: this.model.isCivilServant,
                        familySituation: this.model.familySituation,
                        isFrench: this.model.isFrench,
                        isBornInFrance: this.model.isBornInFrance,
                        codeCountryBirthForeign : this.model.codeCountryBirthForeign,
                        numberStep: 1,
                        isStepOneComplete: false,
                        ctxList: this.model.ctxList,
                        typeContract: this.model.typeContract
                    });
                    if (this.contract.typeContract == "paper" && this.contract.addrEmail == "") {
                        this.form.controls['addrEmail'].clearValidators();
                        this.form.controls['addrEmail'].setErrors(null);
                    }
                }.bind(this));
            }
        });

        this.referenceService.getAllReferences().subscribe(
            list => {
                this.listNationality = this.referenceService.getReferencesByType(list, 'T_NATIO');
                this.listCivility = this.referenceService.getReferencesByType(list, 'T_ECIV');
                this.listSituationFamily = this.referenceService.getReferencesByType(list, 'T_SFAM');
            }
        );

        this.form.controls['civCodePostalBirth'].valueChanges.subscribe(
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

        this.form.controls['civCityBirth'].valueChanges.subscribe(
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

        this.form.controls['isFrench'].valueChanges.subscribe(
            data => {
                if(data){
                    this.form.controls['codeNationality'].setValue(100);
                    this.form.controls['numberResidentPermit'].setValue(1);
                    let date = new Date('2017-03-03');
                    this.form.controls['dateValidationResidentPermit'].setValue(date);
                    let update = [];
                    let i = 0;
                    while(this.validationInformation[i]){
                        if(this.validationInformation[i].control !='numberResidentPermit' && this.validationInformation[i].control !='dateValidationResidentPermit'){
                            update.push(this.validationInformation[i]);
                        } 
                        i++;
                    }
                    this.validationInformation = update;
                } else{
                    this.form.controls['codeNationality'].setValue(this.model.codeNationality);
                    this.form.controls['numberResidentPermit'].setValue(this.model.numberResidentPermit);
                    this.form.controls['dateValidationResidentPermit'].setValue(this.model.dateValidationResidentPermit);
                    this.validationInformation.map(validation => {
                        if(validation.control == 'numberResidentPermit' || validation.control == 'dateValidationResidentPermit'){
                            this.exist = true;
                        } else{
                            this.exist = false;
                        }
                    });
                    if (this.exist == false){
                        this.validationInformation.push(
                            {
                                value: 'Titre de séjour',
                                control: 'numberResidentPermit'
                            },
                            {
                                value: 'Date du titre de séjour',
                                control: 'dateValidationResidentPermit'
                            }
                        );
                    }
                }
            }
        );
        this.form.controls['civCodeCivilite'].valueChanges.subscribe(
            data => {
                if(data != 'MME'){
                    this.form.controls['civMaidenName'].setValue('A');
                    let i = 0;
                    let maiden = [];
                    while(this.validationInformation[i]){
                        if(this.validationInformation[i].control != 'civMaidenName'){
                            maiden.push(this.validationInformation[i]);
                        }
                        i++;
                    }
                    this.validationInformation = maiden;
                } else{
                    this.form.controls['civMaidenName'].setValue(null);
                    let exist = false;
                    this.validationInformation.map(validation => {
                        if(validation.control == 'civMaidenName'){
                            exist = true;
                        } else{
                            exist = false;
                        }
                    });
                    if(!exist){
                        this.validationInformation.push({
                            value: 'Nom de jeune fille',
                            control: 'civMaidenName'
                        });
                    }
                }
            }
        );
        this.form.controls['addrEmail'].valueChanges.subscribe(
            data => {
                if(data == this.contract.addrEmail){
                    this.emailError = true;
                } else{
                    this.emailError = false;
                }
            }
        );
        let control = ['addrEmail', 'addrNumCellular', 'addrNumPhone', 'secuSocialNumber'];
        control.map(cont => {
            this.form.controls[cont].valueChanges.subscribe(
                data => {
                    this.generalBlock = false;
                    if(cont == 'addrEmail'){
                        this.blockEmail = false;
                        this.error = null;
                    } else if(cont == 'addrNumCellular'){
                        this.blockCell = false;
                        this.error = null;
                    } else if(cont == 'addrNumPhone'){
                        this.blockPhone = false;
                        this.error = null;
                    } else{
                        this.error = null;
                        this.blockSecu = false;
                    }
                }
            )
        });

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

    checkFieldIsCTX(ctxList, field) {
        return ctxList.filter(function (item) {
            return item.field == field && item.isCTX == true;
        });
    }


    submit() {
        this.submitted = true;
        this.checkSubmit = true;
        let control = ['lastName', 'civMaidenName', 'firstName'];
        for (let i = 0; i < control.length; i++){
            if(this.form.controls[control[i]].value != null){
                this.form.controls[control[i]].setValue(this.form.controls[control[i]].value.toUpperCase());
            }
        }
        if (this.form.value.isBornInFrance == false) {
            this.form.controls['civCodePostalBirth'].setValue("99" + this.form.value.codeCountryBirthForeign);
        }
        if (this.form.value.isFrench && this.form.value.isFrench == true) {
            this.form.controls['codeNationality'].setValue("100");
        }
        if (this.form.value.typeContract == "paper" && this.form.controls['addrEmail'].value == null) {
            this.form.controls['addrEmail'].clearValidators();
            this.form.controls['addrEmail'].setErrors(null);
        }
        if (this.form.value.addrNumPhone == null && this.form.value.addrNumCellular != null) {
            this.form.controls['addrNumPhone'].setValue(this.form.value.addrNumCellular);
        }
        if (this.form.valid) {
            this.form.controls['isStepOneComplete'].setValue(true);
        } else{
            this.form.controls['isStepOneComplete'].setValue(false);
        }
        this.contractsService.updateContract(this.contract._id, this.form.value).subscribe(function (contract) {
            if (contract.status == 200) {
                this.router.navigate(['/contract/step-two', contract.data._id]);
            } else if (contract.status == 207) {
                if (this.checkFieldIsCTX(contract.data, "addrEmail").length > 0){
                    this.blockEmail = true;
                    this.error = 'email';
                }
                if (this.checkFieldIsCTX(contract.data, "addrNumCellular").length > 0) {
                    this.blockCell = true;
                    this.error = 'cell';
                }
                if (this.checkFieldIsCTX(contract.data, "addrNumPhone").length > 0) {
                    this.blockPhone = true;
                    this.error = 'phone';
                }
                if (this.checkFieldIsCTX(contract.data, "secuSocialNumber").length > 0) {
                    this.blockSecu = true;
                    this.error = 'security';
                }
            }

        }.bind(this));
    }

    updateCity(value){
        if(this.form.controls[value].value != null && this.form.controls[value].value != ''){
            if(value == 'civCodePostalBirth'){
                let a = 0;
                while(this.cities[a]){
                    if(this.cities[a].zipCode == this.form.controls[value].value){
                        this.form.controls['civCityBirth'].setValue(this.cities[a].city);
                    }
                    a++;
                }
            } else{
                let a = 0;
                while(this.zipCodes[a]){
                    if(this.zipCodes[a].city == this.form.controls[value].value){
                        this.form.controls['civCodePostalBirth'].setValue(this.zipCodes[a].zipCode);
                    }
                    a++;
                }
            }

        }
    }



}
