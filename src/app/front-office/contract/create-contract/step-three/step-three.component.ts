import {Component, OnInit, AfterViewInit} from '@angular/core';
import { StepThreeModel } from "./step-three.model";
import {Router, ActivatedRoute} from "@angular/router";
import {ContractsService} from "../../../../services/contracts.service";
import {ReferenceService} from "../../../../services/references.service";
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {UserService} from "../../../../services/users.service";
import {error} from "selenium-webdriver";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-step-three',
  templateUrl: 'step-three.component.html',
  styleUrls: ['step-three.component.css']
})
export class StepThreeComponent implements OnInit {

    contract: any;
    model: StepThreeModel;
    submitted = false;
    listCtrCodeTypeRecrut : any;
    listCtrCodeTypeCampagneRecrut : any;
    listCtrCodeOptionDemarrageRecrut : any;
    listPacksLib : any;
    listPacksDev : any;
    listTeam : any;
    listCodeStructure : any;
    user : any;
    filteredRecs: any;
    filteredSig: any;
    id: string;
    form : FormGroup;

    recrute = [];
    signaleuse = [];

    validationInformation = [
        {
            value: 'Signaleuse',
            control: 'codeCollaborateurSignaleuse'
        },
        {
            value: 'Recruteuse',
            control: 'codeCollaborateurRecruteuse'
        },
        {
            value: 'Groupe d affectation',
            control: 'codeStructure'
        },
        {
            value: 'Provenance contact',
            control: 'ctrCodeTypeRecrut'
        },
        {
            value: 'Campagne de recrutement',
            control: 'ctrCodeTypeCampagneRecrut'
        },
        {
            value: 'Option de démarrage',
            control: 'ctrCodeOptionDemarrageRecrut'
        },
        {
            value: 'Outil de recrutement',
            control: 'clientCodeTypeOperation'
        }
    ]

    constructor(private router: Router,
                private route: ActivatedRoute,
                private referenceService : ReferenceService,
                private contractsService: ContractsService,
                private formBuilder: FormBuilder,
                private userService : UserService
    ) {
        this.router = router;
            this.form = this.formBuilder.group({
                codeCollaborateurSignaleuse:['', Validators.required],
                codeCollaborateurRecruteuse:['', Validators.required],
                codeStructure:['', Validators.required],
                ctrCodeOptionDemarrageRecrut:['', Validators.required],
                ctrCodeTypeCampagneRecrut:['', Validators.required],
                ctrCodeTypeRecrut:['', Validators.required],
                inforhFlagAtelierEssai:'',
                inforhFlagValise:'',
                clientCodeTypeOperation:['', Validators.required],
                inforhCodeAnimatriceAtelier:'',
                numberStep: '',
                ctxList: '',
                isStepThreeComplete: '',
                nameCollaborateurRecruteuse: '',
                nameCollaborateurSignaleuse: ''
            });
        this.filteredRecs = this.form.controls['nameCollaborateurRecruteuse'].valueChanges
        .startWith(null)
        .map(name => this.filterRecs(name));

        this.filteredSig = this.form.controls['nameCollaborateurSignaleuse'].valueChanges
        .startWith(null)
        .map(name => this.filterSig(name));
    }

    filterRecs(val: string) {
        return val ? this.recrute.filter(s => s.toString().toLowerCase().indexOf(val.toString().toLowerCase()) === 0)
        : this.recrute;
    }

    filterSig(val: string) {
        return val ? this.signaleuse.filter(s => s.toString().toLowerCase().indexOf(val.toString().toLowerCase()) === 0)
        : this.signaleuse;
    }

    ngOnInit(): void {

        this.userService.getMe().subscribe(
            (user) => {

                this.user = user;
                // this.user.profile = 'recrue';
                this.setTeamOfUserConnected(this.user);
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
                            console.log(this.contract);
                            this.model = new StepThreeModel(contract);
                            this.form.setValue({
                                codeCollaborateurSignaleuse: this.model.codeCollaborateurSignaleuse,
                                codeCollaborateurRecruteuse: this.model.codeCollaborateurRecruteuse,
                                codeStructure: this.model.codeStructure,
                                ctrCodeOptionDemarrageRecrut: this.model.ctrCodeOptionDemarrageRecrut,
                                ctrCodeTypeCampagneRecrut: this.model.ctrCodeTypeCampagneRecrut,
                                ctrCodeTypeRecrut: this.model.ctrCodeTypeRecrut,
                                inforhFlagAtelierEssai: this.model.inforhFlagAtelierEssai,
                                inforhFlagValise: this.model.inforhFlagValise,
                                clientCodeTypeOperation: this.model.clientCodeTypeOperation,
                                inforhCodeAnimatriceAtelier: this.model.inforhCodeAnimatriceAtelier,
                                numberStep: 3,
                                ctxList: this.model.ctxList,
                                isStepThreeComplete: false,
                                nameCollaborateurRecruteuse: this.model.nameCollaborateurRecruteuse,
                                nameCollaborateurSignaleuse: this.model.nameCollaborateurSignaleuse
                            });
                        }.bind(this));
                    }
                });

                this.referenceService.getAllReferences().subscribe(
                    list => {
                        this.listCtrCodeTypeRecrut = this.referenceService.getReferencesByType(list, 'T_TYPRE');
                        this.listCtrCodeTypeCampagneRecrut = this.referenceService.getReferencesByType(list, 'T_TYCMP');
                        this.listCtrCodeOptionDemarrageRecrut = this.referenceService.getReferencesByType(list, 'T_OPTDEM');
                    }
                );

                this.referenceService.getListPacks().subscribe(
                    list => {
                        this.listPacksLib = this.referenceService.getReferencesByType(list, 'T_OTLREC');
                        this.listPacksDev = this.referenceService.getReferencesByType(list, 'T_OTLREC2');
                    }
                );

            },
            (error) => {
                this.router.navigate(['/logas']);
            }
        );
        this.form.controls['nameCollaborateurRecruteuse'].valueChanges.subscribe(
            data => {
                if (this.listTeam) {
                    this.listTeam.map(team => {
                        if (data == team.firstName + ' ' + team.lastName){
                            this.form.controls['codeCollaborateurRecruteuse'].setValue(team.matricule);
                            this.setForMe(data);
                        }
                    });
                }
            }
        );
        this.form.controls['nameCollaborateurSignaleuse'].valueChanges.subscribe(
            data => {
                if (this.listTeam) {
                    this.listTeam.map(team => {
                        if (data == team.firstName + ' ' + team.lastName) {
                            this.form.controls['codeCollaborateurSignaleuse'].setValue(team.matricule);
                        }
                    });
                }
            }
        );
    }

    setForMe(value) {
        if (this.user.profile != "DD" && this.user.profile != "DR" && this.user.profile != "ZM") {
            if (value == this.user.firstName.toUpperCase() + ' ' + this.user.lastName.toUpperCase()) {
                this.form.controls['nameCollaborateurSignaleuse'].setValue(value);
                this.form.controls['codeCollaborateurSignaleuse'].setValue(this.user.matricule);
                this.form.controls['codeStructure'].setValue(this.user.group);
            }
        }
    }

    setTeamOfUserConnected(user) {
        if (user.profile == 'CO') {
            this.listTeam = [user];
            this.setCodeStructure(this.listTeam);
            this.updateAuto();
        }
        else if (user.profile == 'Leader' || user.profile == 'AA' || user.profile == 'AS'){
             this.userService.getSubUserByMatricule(user.matricule).subscribe(
                (team) => {
                    this.listTeam = team;
                    this.setCodeStructure(this.listTeam);
                    this.updateAuto();
;                }
            );
        }
        else if (user.profile == 'LDS' || user.profile == 'ADS') {
            this.userService.getSubUserByGSDRValue(user.GSDRValue).subscribe(
                (team) => {
                    this.listTeam = team;
                    this.setCodeStructure(this.listTeam);
                    this.updateAuto();
                }
            );
        }
        else if (user.profile == 'DD' || user.profile == 'ZM' || user.profile == 'DR')
        {
             this.userService.getSubUserByGSDRValue(user.GSDRValue).subscribe(
                (team) => {
                    this.listTeam = team;
                    this.setCodeStructure(this.listTeam);
                    this.updateAuto();
                }
            );
        }
    }

    updateAuto(){
        let i = 0;
        while(this.listTeam[i]){
            this.recrute.push(this.listTeam[i].firstName + ' ' + this.listTeam[i].lastName);
            this.signaleuse.push(this.listTeam[i].firstName + ' ' + this.listTeam[i].lastName);
            i++;
        }
    }

    setCodeStructure(team) {
        this.listCodeStructure = this.uniq(team, 'group', 'groupName');
    }

    uniq(list, GSDRValue, GSDRName) {

        var listCodeStructure = [];
        for (let plop of list) {
            var codeStructure = {
                'matricule' : plop[GSDRValue],
                'name' : plop[GSDRName]
            };
            listCodeStructure.push(codeStructure);

        }
        return listCodeStructure.filter(function (a) {
            var key = a.matricule + '|' + a.name;
            if (!this[key]) {
                this[key] = true;
                return true;
            }
        }, Object.create(null));

    }

    submit() {
        this.submitted = true;
        if(this.form.valid){
            this.form.controls['isStepThreeComplete'].setValue(true);
        } else{
            this.form.controls['isStepThreeComplete'].setValue(false);
        }
        this.contractsService.updateContract(this.contract._id, this.form.value).subscribe(function (contract) {
            if (contract.status == 200) {
                this.router.navigate(['/contract/step-four', contract.data._id]);
            } else if (contract.status == 207) {
            }

        }.bind(this));
    }

}
