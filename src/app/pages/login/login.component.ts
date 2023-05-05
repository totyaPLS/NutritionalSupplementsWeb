import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {LoadingService} from "../../common/services/loading.service";
import {AuthService} from "../../common/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  loading: boolean = false;

  constructor(private router: Router, private loadingService: LoadingService, private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.router.navigateByUrl('/main');
  }

  goToSignup() {
    this.router.navigateByUrl('/registration');
  }

  login() {
    this.loading = true;

    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).then(cred => {
      console.log(cred);
      this.router.navigateByUrl('/main');
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.loading = false;
    });
  }
}
