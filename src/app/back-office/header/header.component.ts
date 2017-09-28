import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserStaffService} from "../../services/userStaff.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(private userStaffService : UserStaffService, private router: Router) { }

  openMenu(){
    jQuery('.menu-mobile').slideToggle();
  }

  ngOnInit() {
  }

  logout() {
    this.userStaffService.logout().subscribe(() => {
      this.router.navigate(['/bo/login']);
    });
  }

}
