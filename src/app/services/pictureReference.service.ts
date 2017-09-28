import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PictureReferenceService {

    constructor(private http: Http) { }

    postPictureReference(fileToUpload, list, code) {
        var referentiel = list+'.'+code;
        let input = new FormData();
        input.append("file", fileToUpload);
        input.append("referentiel", referentiel);
        return this.http.post('/api/picture/upload', input);
    }

    delete(id) {
        return this.http.delete('/api/picture/'+id);
    }
}