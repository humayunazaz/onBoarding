export class StepSixModel {
    addrSmsAutorisation : boolean;
    emailAutorisation : boolean;
    okContratStanhome: string;
    inforhFlagAttestWork: string;
    taxeCodeAutorisation: string;
    directDebitAutorisation: string;
    promotionOfferAutorisation: string;
    updateDate: Date;
    ctxList: any;

    constructor(contract : any){
        this.addrSmsAutorisation = contract.addrSmsAutorisation ? contract.addrSmsAutorisation : null;
        this.emailAutorisation = contract.emailAutorisation ? contract.emailAutorisation : null;
        this.okContratStanhome = contract.okContratStanhome ? contract.okContratStanhome : null;
        this.inforhFlagAttestWork = contract.inforhFlagAttestWork ? contract.inforhFlagAttestWork : null;
        this.taxeCodeAutorisation = contract.taxeCodeAutorisation ? contract.taxeCodeAutorisation : null;
        this.directDebitAutorisation = contract.directDebitAutorisation ? contract.directDebitAutorisation : null;
        this.promotionOfferAutorisation = contract.promotionOfferAutorisation ? contract.promotionOfferAutorisation : null;
        this.ctxList = contract.ctxList;
    }

    validFields() : boolean{
        return this.okContratStanhome != null && this.taxeCodeAutorisation != null && this.promotionOfferAutorisation != null
    }
}
