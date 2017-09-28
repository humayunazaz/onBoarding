import { UserService } from './../../../../services/users.service';
import {Component, OnInit} from '@angular/core';
import {StepFiveModel} from "./step-five.model";
import {Router, ActivatedRoute,} from "@angular/router";
import {ContractsService} from "../../../../services/contracts.service";
import {Validators, FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-step-five',
  templateUrl: 'step-five.component.html',
  styleUrls: ['step-five.component.css']
})
export class StepFiveComponent implements OnInit {

  model:StepFiveModel;
  contract: any;
  submitted = false;
  maxLimit = 70;
  characterEnter = 0;

  id: string;
  form : FormGroup;
  user;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private contractsService: ContractsService,
              private formBuilder: FormBuilder,
              private userService: UserService
  )
  {
      this.form = this.formBuilder.group({
          okCarrier: '',
          addressCarrier: '',
          numberStep: '',
          ctxList: '',
          isStepFiveComplete: ''
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
                //   this.contract['isRecorded'] = true;
                //   this.contract['isSigned'] = false;
                  console.log(this.contract);
                  this.model = new StepFiveModel(contract);
                  this.form.setValue({
                      okCarrier: this.model.okCarrier,
                      addressCarrier: this.model.addressCarrier,
                      numberStep: 5,
                      ctxList: this.model.ctxList,
                      isStepFiveComplete: false
                  });
              }.bind(this))
          }
      });
      this.form.valueChanges.subscribe(
          data => {
              if(data.addressCarrier != null){
                  this.characterEnter = data.addressCarrier.length;
              }
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
        this.form.controls['isStepFiveComplete'].setValue(true);
      } else{
        this.form.controls['isStepFiveComplete'].setValue(false);
      }
      this.contractsService.updateContract(this.contract._id, this.form.value).subscribe(function (contract) {
           if (contract.status == 200) {
              this.router.navigate(['/contract/step-six', contract.data._id]);
          } else if (contract.status == 207) {
              console.log("test");
              //Put an error message on the input of the field concerned (Example for addrEmail: The value entered already exists, please enter another)
          }

      }.bind(this));
  }

}
