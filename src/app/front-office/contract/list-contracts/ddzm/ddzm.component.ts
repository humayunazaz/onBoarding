import { Component, OnInit, Input } from '@angular/core';
import { ContractsService } from "../../../../services/contracts.service";
import * as $ from 'jquery';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'ddzm',
  templateUrl: 'ddzm.component.html',
  styleUrls: ['ddzm.component.css']
})
export class DdzmComponent implements OnInit {

    constructor(private contractService: ContractsService, private router : Router) {
    }

    @Input() matricule: string;
    contracts: any;
    expandedItems = [];
    masterContracts:any;
    search = '';
    filterList = [];

    ngOnInit() {
        this.contractService.getContractsByMatricule(this.matricule).subscribe(
            (contracts) => {
                this.contracts = contracts;
                this.masterContracts = contracts;
                this.masterContracts.map(contract => {
                    if(typeof contract.statusContract === 'object'){
                        if(this.filterList.indexOf(contract.statusContract.stanhome) == -1){
                            this.filterList.push(contract.statusContract.stanhome);
                        }
                    }
                });
                let i = 0;
                while(contracts[i]){
                    this.expandedItems.push(false);
                    i++;
                }
            },
        );
    }

    expanded(i) {
        this.expandedItems[i] = !this.expandedItems[i];
    }

    doSearch(){
        let contract = [];
        this.search.toLowerCase();
        this.masterContracts.map(contracts => {
            if(contracts.firstName && contracts.firstName.toLowerCase().indexOf(this.search.toLowerCase()) > -1){
                contract.push(contracts);
            }
            else if (contracts.lastName && contracts.lastName.toLowerCase().indexOf(this.search.toLowerCase()) > -1){
                contract.push(contracts);
            }
            else if (contracts.nameCollaborateurRecruteuse && contracts.nameCollaborateurRecruteuse.toLowerCase().indexOf(this.search.toLowerCase()) > -1){
                contract.push(contracts);
            }
            else if (contracts.nameCollaborateurSignaleuse && contracts.nameCollaborateurSignaleuse.toLowerCase().indexOf(this.search.toLowerCase()) > -1){
                contract.push(contracts);
            }
            else if (contracts.addrEmail && contracts.addrEmail.toLowerCase().indexOf(this.search.toLowerCase()) > -1){
                contract.push(contracts);
            }
            else if (contracts.addrNumCellular && contracts.addrNumCellular.toLowerCase().indexOf(this.search.toLowerCase()) > -1){
                contract.push(contracts);
            }
        });
        this.contracts = contract;
    }

    updateSearch(value){
        this.search = value;
        if(value == ''){
            this.contracts = this.masterContracts;
        }
    }

    doFilter(value){
        console.log("value" , value);
        let contracts = [];
        if (value == "all") {
            console.log(this.masterContracts);
            this.contracts = this.masterContracts;
        } else {
            this.masterContracts.map(contract => {
                if (typeof contract.statusContract === 'object') {
                    if (contract.statusContract.stanhome == value) {
                        contracts.push(contract);
                    }
                }
            });
            this.contracts = contracts;
        }
    }
}