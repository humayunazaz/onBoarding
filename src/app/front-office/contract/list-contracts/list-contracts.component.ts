import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/users.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-contracts',
  templateUrl: 'list-contracts.component.html',
  styleUrls: ['list-contracts.component.css']
})
export class ListContractsComponent implements OnInit {

  constructor(private userService : UserService, private router: Router) { }

  user : any;
  matricule: any;
  profile : string;

  ngOnInit() {
      this.userService.getMe().subscribe(
          (user) => {
              this.user = user;
              this.profile = this.userService.getProfile(user.profile);
              this.matricule = user.matricule;
          },
          (error) => {
              this.router.navigate(['/logas'])
          }
      );
  }

}
