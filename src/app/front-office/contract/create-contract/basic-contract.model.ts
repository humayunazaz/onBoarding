export class BasicContractModel {

    typeContract: string;
    addrEmail: string;
    confirmEmail: string;
    lastName: string;
    firstName: string;
    creatorMatricule : any;
    ctrDateStartCenter: Date;
    creationDate : Date;
    updateDate: Date;

    constructor(){
    }

    validFields() : boolean{
        return this.typeContract != null && this.lastName != null
            && this.firstName != null
    }

}
