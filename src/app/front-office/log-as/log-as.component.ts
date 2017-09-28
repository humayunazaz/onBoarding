import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {Router} from '@angular/router';
import {UserService} from "../../services/users.service";
import {MessageService} from "../../services/message.service";

@Component({
    selector: 'app-log-as',
    templateUrl: './log-as.component.html',
    styleUrls: [
        './log-as.component.css',
        '../../../assets/css/base.css',
        '../../../assets/css/bootstrap.css',
        '../../../assets/css/basictable.css',
        '../../../assets/css/fonts.css',
        '../../../assets/css/responsive-tabs.css'
    ],
    encapsulation: ViewEncapsulation.None
})
export class LogAsComponent implements OnInit {

    logasForm: FormGroup;
    matricule : FormControl;
    message : any;

    bodyClasses:string = "sidentifier";

    ngOnDestroy() {
        $('body').removeClass(this.bodyClasses);
    }

    constructor(private fb: FormBuilder,
                private router: Router,
                private userService : UserService,
                private messageService: MessageService)
    {

        this.logasForm = this.fb.group({
            matricule: [
                this.matricule,
                [
                    Validators.required
                ]
            ],
        });
    }

    ngOnInit() {
        $('body').addClass(this.bodyClasses);
        this.messageService.getMessage().subscribe(message => { this.message = message;});
    }

    onSubmit() {
        if (this.logasForm.valid && this.logasForm.value.matricule) {
            this.userService.logAsByMatricule(this.logasForm.value.matricule)
                .subscribe(
                    (user) => {
                        this.router.navigate(['/contract/list'])
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
