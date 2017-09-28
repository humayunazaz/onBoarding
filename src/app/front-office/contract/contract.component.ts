import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/users.service";
import {Router} from "@angular/router";
import {MdDialog, MdDialogRef} from '@angular/material';
import { CreateContractComponent } from './create-contract/create-contract.component';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  user : any;
  profession: string;
  profile : string;

  constructor(private userService : UserService, private router: Router, public dialog: MdDialog) { }

  openMenu(){
        jQuery('.menu-mobile').slideToggle();
  }

  openModal(){
    this.dialog.open(CreateContractComponent);
  }

  ngOnInit() {
      this.userService.getMe().subscribe(
          (user) => {
              this.user = user;
              this.profile = this.userService.getProfile(user.profile);
              this.profession = this.userService.getProfession(user);
          },
          (error) => {
              this.router.navigate(['/logas']);
          }
      );
  }

  logout() {
      this.userService.logout().subscribe(() => {
          this.router.navigate(['/logas']);
      });
  }
}
