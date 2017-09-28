import { Component, OnInit } from '@angular/core';
import {UserStaffService} from "../../services/userStaff.service";
import { Router } from '@angular/router';
import {MdDialog, MdDialogRef} from '@angular/material';
import {UserStaffCreateComponent} from "./userStaff-create.component";
import {UserStaffDetailComponent} from "./userStaff-detail.component";
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-userStaff-list',
    templateUrl: 'userStaff-list.component.html',
    // styleUrls: ['./userStaff.component.css']
})
export class UserStaffListComponent implements OnInit {

    usersList : any = [];
    expandedItems = [];
    masterList = [];
    search;
    constructor(private userStaffService: UserStaffService,
                private router: Router,
                public dialog: MdDialog) { }

    ngOnInit() {
        this.userStaffService.getList().subscribe(list => {
            this.usersList = list;
            this.masterList = list;
            console.log(list);
            let i = 0;
            while(this.usersList[i]){
                this.expandedItems.push(false);
                i++;
            }
        });
    }

    openModalCreateUser(){
        let dialogRef = this.dialog.open(UserStaffCreateComponent);
        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });
    }

    openModalEditUser(user){
        let dialogRef = this.dialog.open(UserStaffDetailComponent, {
            data : user
        });
        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });
    }

    goUpdateUser(user : any) {
        this.router.navigate(['/bo/user', user._id]);
    }

    createNewUserStaff() {
        this.router.navigate(['/bo/new-user']);
    }

    deleteUser(user : any) {
        this.userStaffService.deleteUserStaff(user._id).subscribe(res => {
            this.ngOnInit();
        });
    }

    expanded(i) {
        this.expandedItems[i] = !this.expandedItems[i];
    }

    doSearch(){
        let users = [];
        this.masterList.map(user => {
            if(user.firstName.toLowerCase().indexOf(this.search) > -1){
                users.push(user);
            } else if(user.lastName.toLowerCase().indexOf(this.search) > -1){
                users.push(user);
            } else if(user.email.toLowerCase().indexOf(this.search) > -1){
                users.push(user);
            }
        });
        this.usersList = users;
    }

    updateSearch(value){
        this.search = value;
        if(this.search == ''){
            this.usersList = this.masterList;
        }
    }

    // filter function

    filterUser(value){
        let users = [];
        this.masterList.map(user => {
            if(user.profile == value){
                users.push(user);
            }
        });
        this.usersList = users;
    }
}
