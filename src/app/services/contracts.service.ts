import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {BasicContractModel} from "../front-office/contract/create-contract/basic-contract.model";
import {Observable} from "rxjs";
import {StepOneModel} from "../front-office/contract/create-contract/step-one/step-one.model";
import {StepTwoModel} from "../front-office/contract/create-contract/step-two/step-two.model";
import {StepThreeModel} from "../front-office/contract/create-contract/step-three/step-three.model";
import {StepFourModel} from "../front-office/contract/create-contract/step-four/step-four.model";
import {StepFiveModel} from "../front-office/contract/create-contract/step-five/step-five.model";
import {StepSixModel} from "../front-office/contract/create-contract/step-six/step-six.model";

@Injectable()
export class ContractsService {


  private baseUrl = '/api/contracts/';

  constructor(private http: Http) {
    /*this.contractsService.getContractList().subscribe(res => console.log(res));*/

  }

  /**
   * Get all contract
   * @returns {Observable<R>}
   */
  getContractList() {
    return this.http.get(this.baseUrl)
      .map(res => res.json());
  }

  /**
   * Get COntract by Id
   * @param id
   * @returns {Observable<R>}
   */
  getContractById(id : string) {
    return this.http.get(this.baseUrl + id)
        .map(res => res.json());
  }

  /**
   * Create contract
   * @param basicContractModel
   * @returns {Observable<R>}
   */
  createContract(basicContractModel : BasicContractModel) {
    return this.http.post(this.baseUrl, basicContractModel)
        .map(res => res.json());
  }

  /**
   *  Update contract by Id
   * @param id
   * @param stepModel
   * @returns {Observable<R>}
   */
  updateContract(id : string, stepModel : StepOneModel | StepTwoModel | StepThreeModel | StepFourModel | StepFiveModel | StepSixModel) {
    stepModel.updateDate = new Date();
    return this.http.put( this.baseUrl + id, stepModel)
        .map(res => res.json())
  }



  getContractsByMatricule(matricule) {
    return this.http.get('/api/contracts/by/'+matricule)
        .map(res => res.json());
  }

}