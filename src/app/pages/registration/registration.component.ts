import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {User} from "../../common/models/User";
import {ErrorMessages} from "../../common/enums/ErrorMessages";
import {AuthService} from "../../common/services/auth.service";
import {UserService} from "../../common/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  signUpForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^[a-zA-Z0-9]+$/)
    ]),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    })
  });
  rePassword = new FormControl('');
  loading: boolean = false;

  constructor(private location: Location, private router: Router, private authService: AuthService, private userService: UserService) {
    this.rePassword.addValidators([Validators.required]);
  }

  ngOnInit(): void {}

  checkPasswordsMatch() {
  let firstPsw = this.signUpForm.get('password')?.value;
  let rePsw = this.rePassword.value;

    if (firstPsw !== '' && rePsw !== '' && firstPsw === rePsw) {
      this.rePassword.setErrors(null);
    } else {
      this.rePassword.setErrors({ mismatch: true });
    }
  }

  getFormValidationErrors() {
    Object.keys(this.signUpForm.controls).forEach(key => {
      // @ts-ignore
      const controlErrors: ValidationErrors = this.signUpForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  getEmailError() {
    if (this.signUpForm.controls['email'].hasError('required')) {
      return ErrorMessages.Required;
    }

    if (this.signUpForm.controls['email'].hasError('email')) {
      return ErrorMessages.Email;
    }

    if ((this.signUpForm.controls['email'].hasError('pattern'))) {
      return ErrorMessages.Email;
    }

    return '';
  }

  getPasswordError() {
    if (this.signUpForm.controls['password'].hasError('required')) {
      return ErrorMessages.Required;
    }

    if ((this.signUpForm.controls['password'].hasError('pattern'))) {
      return ErrorMessages.PatternSpecChars;
    }

    if (!(this.signUpForm.controls['password'].hasError('minLength'))) {
      return ErrorMessages.MinLengthEight;
    }

    return '';
  }

  getRePasswordError() {
    if (this.rePassword.hasError('mismatch')) {
      return ErrorMessages.Mismatch;
    }

    return '';
  }

  onSubmit() {
    this.loading = true;
    this.authService.signup(this.signUpForm.get('email')?.value, this.signUpForm.get('password')?.value).then(cred => {
      this.loading = false;
      const user: User = {
        id: cred.user?.uid as string,
        email: this.signUpForm.get('email')?.value as string,
        name: {
          firstName: this.signUpForm.get('name.firstName')?.value as unknown as string,
          lastName: this.signUpForm.get('name.lastName')?.value as unknown as string
        }
      };
      this.userService.create(user).then(_ => {
        // TODO: create empty Cart for the user
        this.router.navigateByUrl('/main');
      }).catch(error => {
        console.error(error);
      });
    }).catch(error => {
      console.log(error);
      this.loading = false;
    });
  }

  goBack() { this.location.back() }
}
