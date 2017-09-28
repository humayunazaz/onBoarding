export class StepFiveModel {
    okCarrier: boolean;
    addressCarrier: string;
    updateDate: Date;
    ctxList: any;

    constructor(contract : any){
        this.okCarrier = contract.okCarrier ? contract.okCarrier : null;
        this.addressCarrier = contract.addressCarrier ? contract.addressCarrier : null;
        this.ctxList = contract.ctxList;
    }

    validFields() : boolean{
        return this.okCarrier != null && this.addressCarrier != null
    }


}
