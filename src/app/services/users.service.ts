import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

    constructor(private http: Http) { }

    logAsByMatricule(matricule) {
        return this.http.get('/api/users/logAs/' + matricule)
            .map(res => res.json());
    }

    getSubUserByMatricule(matricule) {
        return this.http.get('/api/users/getSubUserByMatricule/' + matricule)
            .map(res => res.json());
    }

    getSubUserByGSDRValue(GSDRValue) {
        return this.http.get('/api/users/getSubUserByGSDRValue/' + GSDRValue)
            .map(res => res.json());
    }

    getMe(){
        return this.http.get('/api/users/getMe')
            .map(res => res.json());
    }

    getProfile(profile) {
        switch (profile) {
            case 'CO':
            case 'AS':
            case 'AA':
            case 'ADS':
            case 'Coach':
            case 'Leader':
            case 'LDS':
                return 'coach';
            case 'DD':
            case 'ZM':
            case 'DR':
                return 'ddzm';
            default:
                return 'recruit';
        }
    }

    logout(){
        return this.http.post('/api/users/logOut', {})
            .map(res => res.json());
    }

    getProfession(user) {
        switch (user.profile) {
            case 'CO' || 'Coach':
                return 'Coach';
            case 'AA':
                return 'Animatrice Atelier';
            case 'ADS':
                return 'Animatrice de Secteur';
            case 'AS':
                return 'Animatrice Stagiaire';
            case 'DD' :
                return 'Directrice de Division';
            case 'ZM' :
                return 'Zone Manager';
            case 'DR':
                return 'Directrice de Région';
            case 'LDS' || 'Leader':
                return user.p2RLevel;
            default:
                return '';
        }
    }

    checkInformations(infos) {
        return this.http.post('/api/users/check-informations', infos)
            .map(res => res);
    }

}