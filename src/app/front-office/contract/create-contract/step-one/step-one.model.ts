
export class StepOneModel {
    addrEmail:string;
    civCodeCivilite:string;
    lastName:string;
    firstName:string;
    civMaidenName:string;
    addrNumCellular:number;
    addrNumPhone:number;
    secuSocialNumber:number;
    birthDate:any;
    isFrench:boolean;
    civCodePostalBirth:string;
    civCityBirth:string;
    codeNationality:string;
    numberResidentPermit:string;
    dateValidationResidentPermit:any;
    isCivilServant:boolean;
    familySituation:string;
    isBornInFrance: boolean;
    codeCountryBirthForeign : string;
    updateDate: Date;
    ctxList: any;
    typeContract: string;

  constructor(contract : any){
    this.addrEmail = contract.addrEmail;
    this.civCodeCivilite = contract.civCodeCivilite ? contract.civCodeCivilite :  null;
    this.lastName = contract.lastName ? contract.lastName : null;
    this.firstName = contract.firstName ? contract.firstName : null;
    this.civMaidenName = contract.civMaidenName ? contract.civMaidenName : null;
    this.addrNumCellular = contract.addrNumCellular ? contract.addrNumCellular : null;
    this.addrNumPhone = contract.addrNumPhone ? contract.addrNumPhone : null;
    this.secuSocialNumber = contract.secuSocialNumber ? contract.secuSocialNumber : null;
    this.birthDate = contract.birthDate ? new Date(contract.birthDate) : null;
    this.civCodePostalBirth = contract.civCodePostalBirth ? contract.civCodePostalBirth : null;
    this.civCityBirth = contract.civCityBirth ? contract.civCityBirth : null;
    this.codeNationality = contract.codeNationality ? contract.codeNationality : null;
    this.numberResidentPermit = contract.numberResidentPermit ? contract.numberResidentPermit : null;
    if (contract.isCivilServant == true)
        this.isCivilServant = true;
    else if (contract.isCivilServant == false)
        this.isCivilServant = false;
    else
        this.isCivilServant = null;
    this.familySituation = contract.familySituation ? contract.familySituation : null;
    this.typeContract = contract.typeContract;
    if (this.codeNationality == null)
        this.isFrench = null;
    else if (this.codeNationality == "100")
        this.isFrench = true;
    else
        this.isFrench = false;
    this.dateValidationResidentPermit = contract.dateValidationResidentPermit ? new Date(contract.dateValidationResidentPermit) : null;
    if (this.civCodePostalBirth == null)
        this.isBornInFrance = null;
    else if (this.civCodePostalBirth.substring(0, 2) == "99")
        this.isBornInFrance = false;
    else
        this.isBornInFrance = true;
    this.codeCountryBirthForeign = this.isBornInFrance == false && this.civCodePostalBirth != null ? this.civCodePostalBirth.substring(2) : null;
    this.ctxList = contract.ctxList;
  }
}
