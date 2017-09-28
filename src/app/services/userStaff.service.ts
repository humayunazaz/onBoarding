import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserStaffService {

    constructor(private http: Http) { }

    getList() {
        return this.http.get('/api/staff/list')
            .map((res: Response) => res.json());
    }

    saveUserStaff(user) {
        return this.http.post('/api/staff', {'user' :  user});
    }

    getUserStaffById(id) {
        return this.http.get('/api/staff/'+id)
            .map((res: Response) => res.json());
    }

    deleteUserStaff(id) {
        return this.http.delete('/api/staff/'+id);

    }

    logout(){
        return this.http.post('/api/staff/logOut', {})
            .map(res => res.json());
    }

}