import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {LoadingService} from "../../common/services/loading.service";

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

  constructor(private router: Router, private loadingService: LoadingService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.router.navigateByUrl('/main');
  }

  goToSignup() {
    this.router.navigateByUrl('/registration');
  }

  login() {
    this.loading = true;

    this.loadingService.loadingWithPromise(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).then((_: boolean) => {
      this.router.navigateByUrl('/main');
      this.loading = false;
    }).catch(error => {
      console.error(error);
      this.loading = false;
    }).finally(() => {
      console.log('finally executed!')
      this.loading = false;
    });
  }
}
