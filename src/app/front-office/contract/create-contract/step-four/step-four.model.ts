export class StepFourModel {
  cardOwnerName:string;
  iban:string;
  codeBic:number;
  updateDate: Date;
  ctxList: any;

  constructor(contract : any){
    this.cardOwnerName = contract.cardOwnerName ? contract.cardOwnerName : null;
    this.codeBic = contract.codeBic ? contract.codeBic : null;
    this.iban = contract.iban ? contract.iban : null;
    this.ctxList = contract.ctxList;
  }




  // validFields() : boolean{
  //   // verif ctrCodeTypeRecrut and ctrCodeOptionDemarrageRecrutNOT done
  //   return this.codeBic != null && this.iban != null  && this.cardOwnerName != null
  // }
}
