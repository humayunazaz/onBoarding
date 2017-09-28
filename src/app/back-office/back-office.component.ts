import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-back-office',
    templateUrl: './back-office.component.html',
    styleUrls: [
        './back-office.component.css',
        '../../assets/css/bootstrap.css',
        '../../assets/css/bootstrap-theme.css',
        '../../assets/css/basictable.css',
        '../../assets/css/fonts.css',
        '../../assets/css/responsive-tabs.css'
    ],
    encapsulation: ViewEncapsulation.None
})

export class BackOfficeComponent implements OnInit {

    bodyClasses:string = "backoffice";

    constructor() { }

    ngOnInit() {
        $('body').addClass(this.bodyClasses);
    }

    ngOnDestroy() {
        $('body').removeClass(this.bodyClasses);
    }

}
