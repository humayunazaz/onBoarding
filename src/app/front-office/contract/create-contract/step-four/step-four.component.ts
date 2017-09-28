import {Component, OnInit} from '@angular/core';
import {StepFourModel} from "./step-four.model";
import {Router, ActivatedRoute} from "@angular/router";
import {ContractsService} from "../../../../services/contracts.service";
import {Validators, FormGroup, FormBuilder, AbstractControl, ValidationErrors} from "@angular/forms";
import {UserService} from "../../../../services/users.service";
import { ContractValidators } from '../validators/contract.validators';

@Component({
    selector: 'app-step-four',
    templateUrl: 'step-four.component.html',
    styleUrls: ['step-four.component.css']
})
export class StepFourComponent implements OnInit {

    model: StepFourModel;
    submitted = false;
    contract: any;
    id: string;
    form : FormGroup;
    message: any = null;
    errorAttribute = '';
    validationInformation = [
        {
            value: 'Titulaire du compte',
            control: 'cardOwnerName'
        },
        {
            value: 'IBAN',
            control: 'iban'
        },
        {
            value: 'Code BIC',
            control: 'codeBic'
        }
    ]
    blockIban = false;
    user;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private contractsService: ContractsService,
                private formBuilder: FormBuilder,
                private userService: UserService
    )
    {
        this.form = this.formBuilder.group({
            cardOwnerName:'',
            iban:['', this.checkedIBAN.bind(this)],
            codeBic:['', ContractValidators.checkBIC],
            numberStep: '',
            ctxList: '',
            isStepFourComplete: ''
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
                    this.model = new StepFourModel(contract);
                    this.form.setValue({
                        cardOwnerName: this.model.cardOwnerName,
                        iban: this.model.iban,
                        codeBic: this.model.codeBic,
                        numberStep: 4,
                        ctxList: this.model.ctxList,
                        isStepFourComplete: false
                    });
                }.bind(this))

            }
        })
        
        this.form.controls['iban'].valueChanges.subscribe(
            data => {
                this.blockIban = false;
                this.message = null;
            }
        )

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
        if(this.form.valid){
            this.form.controls['isStepFourComplete'].setValue(true);
        } else{
            this.form.controls['isStepFourComplete'].setValue(false);
        }
        if(this.form.value.cardOwnerName != null){
            this.form.controls['cardOwnerName'].setValue(this.form.controls['cardOwnerName'].value.toUpperCase());
        }
        this.contractsService.updateContract(this.contract._id, this.form.value).subscribe(function (contract) {
            if (contract.status == 200) {
                this.router.navigate(['/contract/step-five', contract.data._id]);
            } else if (contract.status == 207) {
                this.blockIban = true;
                this.message = true;
            }

        }.bind(this));
    }

    checkedIBAN(control: AbstractControl) : ValidationErrors | null {
        let iban;
        if(control.value != '' && control.value != null){
            iban = this.isValidIBANNumber(control.value);
        }

        if(iban === 1){
            return null
        } else{
            return { checkedIBAN:true }
        }

    }

    isValidIBANNumber(input) {
        let CODE_LENGTHS = {
            AD: 24, AE: 23, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22, BH: 22, BR: 29,
            CH: 21, CR: 21, CY: 28, CZ: 24, DE: 22, DK: 18, DO: 28, EE: 20, ES: 24,
            FI: 18, FO: 18, FR: 27, GB: 22, GI: 23, GL: 18, GR: 27, GT: 28, HR: 21,
            HU: 28, IE: 22, IL: 23, IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20, LB: 28,
            LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MD: 24, ME: 22, MK: 19, MR: 27,
            MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28, PS: 29, PT: 25, QA: 29,
            RO: 24, RS: 22, SA: 24, SE: 24, SI: 19, SK: 24, SM: 27, TN: 24, TR: 26
        };

        let iban = input.toUpperCase().replace(/[^A-Z0-9]/g, ''),
                code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/),
                digits;

        if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
            return false;
        }

        digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, function (letter) {
            return letter.charCodeAt(0) - 55;
        });

        return this.mod97(digits);
    }

    mod97(string) {
        let checksum = string.slice(0, 2), fragment;

        for (let offset = 2; offset < string.length; offset += 7) {
            fragment = checksum + string.substring(offset, offset + 7);
            checksum = parseInt(fragment, 10) % 97;
        }

        return checksum;
    }
}
