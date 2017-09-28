import {Component, ViewEncapsulation} from '@angular/core';
import {MessageService} from "./services/message.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'This is Angular 4 !';
  message: any;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    //this.messageService.getMessage().subscribe(message => { this.message = message;console.log(message)});
  }
}
