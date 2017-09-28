import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ContractValidators{
    static notAccented(control: AbstractControl) : ValidationErrors | null {
        let re = /[^a-zA-Z0-9, ' ']/;

        if(re.test(control.value as string)){
            return {notAccented: true}
        } else{
            return null
        }
    }
    static notPunctuation(control: AbstractControl) : ValidationErrors | null {
        let re = /['!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/;

        if(re.test(control.value)){
            return {notPunctuation: true}
        } else{
            return null
        }
    }
    static checkEmail(control: AbstractControl) : ValidationErrors | null {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (control.value != null && control.value != undefined && control.value != '') {
            if (re.test(control.value)) {
                if(control.value.toLowerCase().indexOf('.com') >= 0 || control.value.toLowerCase().indexOf('.net') >= 0 || control.value.toLowerCase().indexOf('.fr') >= 0){
                    return null;
                } else{
                    return {checkEmail: true};
                }
            } else{
                return {checkEmail: true};
            }
        }
        else {
            return null;
        }

    }
    static emailAccent(control: AbstractControl) : ValidationErrors | null {
        let ac = /[^a-zA-Z0-9 @ .]/;

        if(!ac.test(control.value)){
            return null;
        } else{
            return {emailAccent: true};
        }
    }
    static checkMajor(control: AbstractControl) : ValidationErrors | null {

        let birthDate = new Date(control.value);
        let cur = new Date();
        let diff = cur.getFullYear() - birthDate.getFullYear();
        
        if(diff < 18){
            return { checkMajor: true }
        } else{
            return null;
        }

    }    
    static checkBIC(control: AbstractControl) : ValidationErrors | null {
        let re = /^([a-zA-Z]){4}([a-zA-Z]){2}([0-9a-zA-Z]){2}([0-9a-zA-Z]{3})?$/;
        if (control.value != null && control.value != undefined && control.value != '') {
            if (!re.test(control.value)) {
                return {checkBIC: true};
            } else {
                return null;
            }
        }
    }
    static checkNumber(control: AbstractControl) : ValidationErrors | null {
        let re = /^\d+$/;

        if (control.value != null && control.value != undefined && control.value != '') {
            if (!re.test(control.value)) {
                return {checkNumber: true};
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
    static mustbeTenDigits(control: AbstractControl) : ValidationErrors | null {
        if (control.value != null && control.value != undefined && control.value != ''){
            if(control.value.length < 10){
                return { mustbeTenDigits: true };
            } else{
                return null;
            }
        } else {
            return null;
        }
    }
    static validateDate(control: AbstractControl) : ValidationErrors | null {
        
        let startDate = new Date(control.value);
        let endDate = new Date();

        let startDateMonth = startDate.getMonth() + 1;
        let endDateMonth = endDate.getMonth() + 1;

        let startDateDate = startDate.getDate();
        let endDateDdate = endDate.getDate();


        if (endDateMonth - startDateMonth >= 3) {
            if (endDateDdate - startDateDate >= 1) {
                return null;
            } else {
                return { validateDate: true };
            }
        } else{
            return { validateDate: true };
        }
    }

    static mustBeSame(control: AbstractControl) : ValidationErrors | null {
        let cont, confirm;
        if (control.get('typeContract').value == 'paper') {
            cont = 'addrEmail2';
            confirm = 'confirmEmail2';
        }
        else{
            cont = 'addrEmail';
            confirm = 'confirmEmail';
        }


        let email = control.get(cont).value;
        let reEmail = control.get(confirm).value;
        if (email == reEmail || (email == '' && reEmail == '') || (email == null && reEmail == null) || (email == undefined && reEmail == undefined) || ( control.get('typeContract').value == 'paper' && reEmail == '' )) {
            return null;
        } else {
            control.get(confirm).setErrors({mustBeSame:true});
        }
    }

    static checkSecu(control: AbstractControl) : ValidationErrors | null {
        let number;
        if (control.get('secuSocialNumber')) {
            number = control.get('secuSocialNumber').value;
        }
        let compareGender;
        let fullMonth;
        let fullYear;
        if (control.get('birthDate')) {
            fullMonth = new Date(control.get('birthDate').value).getMonth() + 1;
            fullYear = new Date(control.get('birthDate').value).getFullYear();

        }
        let compareMonth;

        let compareYear;
        if(control.get('civCodeCivilite') && control.get('civCodeCivilite').value == 'MR'){
            compareGender = 1;
        } else{
            compareGender = 2;
        }
        if(fullYear != null){
            compareYear = fullYear.toString().substring(2, 4);
        }

        if(fullMonth < 10){
            compareMonth = '0' + fullMonth;
        } else{
            compareMonth = fullMonth;
        }
        let compareZipCode;
        if (control.get('civCodePostalBirth') && control.get('civCodePostalBirth').value != null) {
            compareZipCode = control.get('civCodePostalBirth').value.toString().substring(0,2);
        }
        if (control.get('secuSocialNumber') && control.get('secuSocialNumber').value != null){
            let gender = number.substring(0, 1);
            let year = number.substring(1, 3);
            let month = number.substring(3, 5);
            let zipCode = number.substring(5, 7);
            if(control.get('birthDate').value != null && control.get('isBornInFrance').value != null && control.get('isBornInFrance').value && control.get('civCodePostalBirth').value != null && control.get('civCityBirth').value != null) {
                if(gender == compareGender && year == compareYear && month == compareMonth && zipCode == compareZipCode) {
                    return null;
                } else{
                    control.get('secuSocialNumber').setErrors({checkSecu:true});
                }
            }
            else if(control.get('birthDate').value != null && control.get('isBornInFrance').value != null && !control.get('isBornInFrance').value){
                if(gender == compareGender && year == compareYear && month == compareMonth){
                    return null;
                } else{
                    control.get('secuSocialNumber').setErrors({checkSecu:true});
                }
            }
        }
        
    }

}