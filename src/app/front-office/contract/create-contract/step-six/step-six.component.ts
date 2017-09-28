import { UserService } from './../../../../services/users.service';
import {Component, OnInit} from '@angular/core';
import {StepSixModel} from "./step-six.model";
import {Router, ActivatedRoute} from "@angular/router";
import {ContractsService} from "../../../../services/contracts.service";
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
declare var jQuery: any;

@Component({
  selector: 'app-step-six',
  templateUrl: 'step-six.component.html',
  styleUrls: ['step-six.component.css']
})
export class StepSixComponent implements OnInit {
    model:StepSixModel;
    contract: any;

    submitted = false;
    id: string;
    form : FormGroup;
    user;
    validationInformation = [
        {
            value: 'Autorisation SMS',
            control: 'addrSmsAutorisation'
        },
        {
            value: 'Autorisation Email',
            control: 'emailAutorisation'
        },
        {
            value: 'Accepter les conditions de Stanhome',
            control: 'okContratStanhome'
        },
        {
            value: 'Accepter les obligations fiscales',
            control: 'taxeCodeAutorisation'
        },
        {
            value: 'Autorisation bancaire',
            control: 'directDebitAutorisation'
        }
    ]
    disabled = true;
    constructor(private router: Router,
                private route: ActivatedRoute,
                private contractsService: ContractsService,
                private formBuilder: FormBuilder,
                private userService:UserService
    )
    {
        this.form = this.formBuilder.group({
            addrSmsAutorisation : ['',Validators.required],
            emailAutorisation : ['',Validators.required],
            okContratStanhome: ['',Validators.required],
            inforhFlagAttestWork: '',
            taxeCodeAutorisation: ['',Validators.required],
            directDebitAutorisation: ['',Validators.required],
            promotionOfferAutorisation: '',
            numberStep: '',
            ctxList: '',
            isStepSixComplete: ''
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
                    // this.contract['isSigned'] = true;
                    this.model = new StepSixModel(contract);
                    this.form.setValue({
                        addrSmsAutorisation : this.model.addrSmsAutorisation,
                        emailAutorisation : this.model.emailAutorisation,
                        okContratStanhome: this.model.okContratStanhome,
                        inforhFlagAttestWork: this.model.inforhFlagAttestWork,
                        taxeCodeAutorisation: this.model.taxeCodeAutorisation,
                        directDebitAutorisation: this.model.directDebitAutorisation,
                        promotionOfferAutorisation: this.model.promotionOfferAutorisation,
                        numberStep: 6,
                        ctxList: this.model.ctxList,
                        isStepSixComplete: false
                    });
                }.bind(this))
            }
        })
        this.userService.getMe().subscribe(
            (user) => {
                this.user = user;
                // this.user.profile = 'RH';
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
            this.form.controls['isStepSixComplete'].setValue(true);
        } else{
            this.form.controls['isStepSixComplete'].setValue(false);
        }
        this.contractsService.updateContract(this.contract._id, this.form.value).subscribe(function (contract) {
            if (contract.status == 200) {
                this.router.navigate(['/contract/step-seven', contract.data._id]);
            } else if (contract.status == 207) {
                console.log("test");
                //Put an error message on the input of the field concerned (Example for addrEmail: The value entered already exists, please enter another)
            }

        }.bind(this));
    }

}
