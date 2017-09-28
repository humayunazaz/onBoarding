import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ImportService {

    constructor(private http: Http) { }

    forceImport() {
        return this.http.post('/api/imports', {})
            .map(res => res.json());
    }

    listImports() {
        return this.http.get('/api/imports')
            .map(res => res.json());
    }
}