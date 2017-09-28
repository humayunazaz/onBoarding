import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { LoginService } from '../../services/login.service';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {MessageService} from "../../services/message.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: [
        'login.component.css',
        '../../../assets/css/bootstrap.css',
        '../../../assets/css/basictable.css',
        '../../../assets/css/fonts.css',
        '../../../assets/css/responsive-tabs.css',
    ],
    encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

    message : any;
    loginForm: FormGroup;
    email: FormControl;
    password: FormControl;
    bodyClasses:string = "sidentifier";

    constructor(private loginService: LoginService, private router: Router, private messageService: MessageService) { }

    ngOnInit() {

        this.createFormControls();
        this.createForm();

        $('body').addClass(this.bodyClasses);
        this.messageService.getMessage().subscribe(message => { this.message = message;});
    }

    ngOnDestroy() {
        $('body').removeClass(this.bodyClasses);
    }

    createFormControls() {
          this.email = new FormControl('', [
              Validators.required,
          ]);
          this.password = new FormControl('', [
              Validators.required,
          ]);
    }

    createForm() {
          this.loginForm = new FormGroup({
              email: this.email,
              password: this.password,
          });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.loginService.postLogin(this.loginForm.value)
                .subscribe(
                    (user) => {
                        this.router.navigate(['/bo/list-packs'])
                    },
                    (error) => {
                        if (error.status == 404) {
                            this.messageService.sendMessage("Le matricule saisie n'a pas été trouvé");
                        } else {
                            this.messageService.sendMessage("Une erreur est survenue");
                        }

                    }
                );
        }
    }

}
