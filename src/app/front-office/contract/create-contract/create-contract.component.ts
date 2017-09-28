import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {BasicContractModel} from "./basic-contract.model";
import {ContractsService} from "../../../services/contracts.service";
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/users.service";
import { MdDialogClose, MdDialog } from '@angular/material';
import {Validators, FormGroup, FormBuilder, AbstractControl, ValidationErrors} from "@angular/forms";
import { ContractValidators } from './validators/contract.validators';
import {MessageService} from "../../../services/message.service";

@Component({
    selector: 'app-create-contract',
    templateUrl: 'create-contract.component.html',
    styleUrls: ['create-contract.component.css']
})
export class CreateContractComponent implements OnInit {

    model: BasicContractModel;
    user : any;
    submitted = false;
    form:FormGroup;
    contractType = 'digital';
    message : any = null;
    blockEmail = false;
    contractTypes = [
        {
            value: 'digital',
            id: 'digital',
            code: 'Digital'
        },
        {
            value: 'paper',
            id: 'paper',
            code: 'Papier'
        }
    ]

    constructor(
        private contractsService: ContractsService,
        private userService : UserService,
        private router : Router,
        private formBuilder: FormBuilder,
        private dialog : MdDialog,
        private messageService: MessageService,
        private _changeDetectionRef : ChangeDetectorRef
        ) {
            this.form = this.formBuilder.group({
                addrEmail: ['', Validators.compose([
                    Validators.required,
                    ContractValidators.checkEmail,
                    ContractValidators.emailAccent
                ])],
                addrEmail2: ['', Validators.compose([
                    ContractValidators.checkEmail,
                    ContractValidators.emailAccent
                ])],
                lastName: ['', Validators.compose([
                    ContractValidators.notPunctuation,
                    ContractValidators.notAccented,
                    Validators.required
                ])],
                firstName: ['', Validators.compose([
                    ContractValidators.notPunctuation,
                    ContractValidators.notAccented,
                    Validators.required
                ])],
                typeContract: '',
                confirmEmail: ['', Validators.compose([
                    Validators.required,
                    ContractValidators.checkEmail,
                ])],
                confirmEmail2: ['', Validators.compose([
                    ContractValidators.checkEmail,
                ])]
            }, {
                validator: ContractValidators.mustBeSame
            })
    }

    ngOnInit() {
        this.userService.getMe().subscribe(
            (user) => {
                this.user = user;
                this.model = new BasicContractModel();
                this.model.creatorMatricule = this.user.matricule;
                this.model.creationDate = new Date();
                this.model.updateDate = new Date();
                this.model.ctrDateStartCenter = new Date();
                this.model.ctrDateStartCenter.setDate(this.model.ctrDateStartCenter.getDate() + 15);
                this.model.typeContract = this.contractTypes[0].value;
            },
            (error) => {
                this.router.navigate(['/logas'])
            }
        );
        this.form.controls['typeContract'].setValue(this.contractType);
        this.form.controls['addrEmail'].valueChanges.subscribe(
            data => {
                this.blockEmail = false;
            }
        )
        this.form.controls['addrEmail2'].valueChanges.subscribe(
            data => {
                this.blockEmail = false;
            }
        )

        this.form.controls['typeContract'].valueChanges.subscribe(
            data => {
                if (data == 'paper'){
                    console.log(this.form.valid);
                    console.log(this.form.controls['addrEmail']);
                    this.form.controls['addrEmail'].clearValidators();
                    this.form.controls['addrEmail'].setValidators([ContractValidators.checkEmail, ContractValidators.emailAccent]);
                    this.form.controls['addrEmail'].setErrors(null);
                    this.form.controls['confirmEmail'].clearValidators();
                    this.form.controls['confirmEmail'].setValidators([ContractValidators.checkEmail, ContractValidators.emailAccent]);
                    this.form.controls['confirmEmail'].setErrors(null);
                } else {
                    this.form.controls['addrEmail'].setValidators(Validators.compose([
                        Validators.required,
                        ContractValidators.checkEmail,
                        ContractValidators.emailAccent
                    ]));
                    this.form.controls['confirmEmail'].setValidators(Validators.compose([
                        Validators.required,
                        ContractValidators.checkEmail,
                        ContractValidators.emailAccent
                    ]));
                }
            }
        )

    }

    ngAfterViewInit() : void {
        this._changeDetectionRef.detectChanges();
    }

    /**
     * Create contract
     */
    createContract() {
        this.submitted = true;
        if(this.contractType != 'digital'){
            this.model.addrEmail = this.form.controls['addrEmail2'].value;
            this.model.confirmEmail = this.form.controls['confirmEmail2'].value;
        } else{
            this.model.addrEmail = this.form.controls['addrEmail'].value;
            this.model.confirmEmail = this.form.controls['confirmEmail'].value;
        }
        let control = ['lastName', 'firstName'];
        for(let i = 0; i < control.length; i++){
            if(this.form.controls[control[i]].value != null){
                this.form.controls[control[i]].setValue(this.form.controls[control[i]].value.toUpperCase());
            }
        }
        this.model.lastName = this.form.controls['lastName'].value;
        this.model.firstName = this.form.controls['firstName'].value;
        if(this.form.valid){
            if (this.model.validFields()) {
                this.contractsService.createContract(this.model).subscribe(function (contract) {
                    if (contract.status == 201) {
                        this.dialog.closeAll();
                        this.router.navigate(['/contract/step-one', contract.data._id]);
                    } else {
                        this.message = '"Attention, l’adresse email	saisie est signalé comme « contentieuse ». Veuillez	saisir une autre adresse email. La création	du contrat ne peut continuer."';
                        this.messageService.sendMessage(contract.data);
                        this.blockEmail = true;
                    }
                }.bind(this));

            }
        }
    }

    updateType(value){
        this.model.typeContract = value;
        this.contractType = value;
    }


}
