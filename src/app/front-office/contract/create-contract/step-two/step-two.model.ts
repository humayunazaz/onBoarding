export class StepTwoModel {
    addrCity: string;
    addrCodePostal: string;
    addrAddress2: string;
    addrAddress3: string;
    addrAddress1_name: string;
    addrAddress1_number: string;
    addrAddress1: string;
    updateDate: Date;
    ctxList: any;

    constructor(contract : any){

        this.addrCity = contract.addrCity ? contract.addrCity : null;
        this.addrCodePostal = contract.addrCodePostal ? contract.addrCodePostal : null;
        this.addrAddress2 = contract.addrAddress2 ? contract.addrAddress2 : null;
        this.addrAddress3 = contract.addrAddress3 ? contract.addrAddress3 : null;
        this.addrAddress1_name = contract.addrAddress1_name ? contract.addrAddress1_name : null;
        this.addrAddress1_number = contract.addrAddress1_number ? contract.addrAddress1_number : null;
        this.addrAddress1 = contract.addrAddress1 ? contract.addrAddress1 : null;
        this.ctxList = contract.ctxList;
    }

    // setAddrAddress1(){
    //     this.addrAddress1 = this.addrAddress1_number + ' ' + this.addrAddress1_name;
    // }

    validFields() : boolean{

        // verif this.addrCity NOT done
        return this.addrCodePostal != null &&
            this.addrAddress2 != null && this.addrAddress3 != null
            && this.addrAddress1_name != null && this.addrAddress1_number != null

    }





}
