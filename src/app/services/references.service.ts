import { Injectable } from '@angular/core';
import {Http, URLSearchParams, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ReferenceService {

    constructor(private http: Http) { }

    // getReferencesByType(type) {
    //     return this.http.get('/api/references/by/' + type)
    //         .map(res => res.json());
    // }

    getAllReferences() {
        return this.http.get('/api/references')
            .map(res => res.json());
    }

    getReferencesByType(list, type) {
        return list.filter(item => item.type === type);
    }

    getZipCode() {
        return this.http.get('/api/references/zipcode')
            .map(res => res.json());
    }

    getListPacks() {
        return this.http.get('/api/references/list-packs')
            .map((res) => res.json());
    }

    getZipCodeByCity(city) {
        return this.http.get('/api/references/list-zipcode/'+city)
            .map((res) => res.json());
    }

    search(params) {
        let options = new RequestOptions({
            search: params
        });
        return this.http.get('/api/references/search', options)
            .map((res) => res);
    }

}