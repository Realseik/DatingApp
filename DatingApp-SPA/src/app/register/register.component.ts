import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  register() {
    console.log(this.model);
    this.auth.register(this.model).subscribe(
      () => {
        console.log('Register successful');
      },
      error => {
        console.log(error);
      }
    );
  }

  cancel() {
    console.log('Cancelled');
    this.cancelRegister.emit(false);
  }
}
