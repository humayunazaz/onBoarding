import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ContractsService} from "../../../../services/contracts.service";

@Component({
  selector: 'app-step-seven',
  templateUrl: 'step-seven.component.html',
  styleUrls: ['step-seven.component.css']
})

export class StepSevenComponent {

    id: string;
    contract : any;

    constructor(private route: ActivatedRoute, private contractsService: ContractsService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            let id = params['id'];
            this.id = id;
            if (!id) {
                console.error('id required');
            } else {
                this.contractsService.getContractById(id).subscribe(function (contract) {
                    this.contract = contract;
                }.bind(this));
            }
        });
    }
}
