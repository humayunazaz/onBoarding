export class StepThreeModel {
  codeCollaborateurSignaleuse:string;
  codeCollaborateurRecruteuse:string;
  nameCollaborateurRecruteuse:string;
  nameCollaborateurSignaleuse:string;
  codeStructure:string;
  ctrCodeOptionDemarrageRecrut:string;
  ctrCodeTypeCampagneRecrut:string;
  ctrCodeTypeRecrut:string;
  inforhFlagAtelierEssai:boolean;
  inforhFlagValise:boolean;
  clientCodeTypeOperation:string;
  inforhCodeAnimatriceAtelier:string;
  updateDate: Date;
  ctxList: any;

  constructor(contract : any){
    this.codeCollaborateurSignaleuse = contract.codeCollaborateurSignaleuse ? contract.codeCollaborateurSignaleuse : null;
    this.codeCollaborateurRecruteuse = contract.codeCollaborateurRecruteuse ? contract.codeCollaborateurRecruteuse : null;
    this.nameCollaborateurSignaleuse = contract.nameCollaborateurSignaleuse ? contract.nameCollaborateurSignaleuse : null;
    this.nameCollaborateurRecruteuse = contract.nameCollaborateurRecruteuse ? contract.nameCollaborateurRecruteuse : null;
    this.codeStructure = contract.codeStructure ? contract.codeStructure : null;
    this.ctrCodeOptionDemarrageRecrut = contract.ctrCodeOptionDemarrageRecrut ? contract.ctrCodeOptionDemarrageRecrut : null;
    this.ctrCodeTypeCampagneRecrut = contract.ctrCodeTypeCampagneRecrut ? contract.ctrCodeTypeCampagneRecrut : null;
    this.ctrCodeTypeRecrut = contract.ctrCodeTypeRecrut ? contract.ctrCodeTypeRecrut : null;
    if (contract.inforhFlagAtelierEssai == true)
      this.inforhFlagAtelierEssai = true;
    else if (contract.inforhFlagAtelierEssai == false)
      this.inforhFlagAtelierEssai = false;
    else
      this.inforhFlagAtelierEssai = null;
    if (contract.inforhFlagValise == true)
      this.inforhFlagValise = true;
    else if (contract.inforhFlagValise == false)
      this.inforhFlagValise = false;
    else
      this.inforhFlagValise = null;
    this.clientCodeTypeOperation = contract.clientCodeTypeOperation ? contract.clientCodeTypeOperation : null ;
    this.inforhCodeAnimatriceAtelier = contract.inforhCodeAnimatriceAtelier ? contract.inforhCodeAnimatriceAtelier : null;
    this.ctxList = contract.ctxList;
  }

}
