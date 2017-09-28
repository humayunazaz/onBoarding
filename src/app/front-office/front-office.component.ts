import {Component, OnInit, ViewEncapsulation} from '@angular/core';

declare var jQuery:any;

@Component({
    selector: 'app-front-office',
    templateUrl: './front-office.component.html',
    styleUrls: [
        './front-office.component.css',
        '../../assets/css/base.css',
        '../../assets/css/bootstrap-base.css',
        '../../assets/css/basictable.css',
        '../../assets/css/fonts.css',
        '../../assets/css/responsive-tabs.css'
    ],
     encapsulation: ViewEncapsulation.None
})
export class FrontOfficeComponent implements OnInit {

    bodyClasses:string = "frontoffice";

    constructor() { }

    ngOnInit() {
        $('body').addClass(this.bodyClasses);
    }

    ngOnDestroy() {
        $('body').removeClass(this.bodyClasses);
    }
}
