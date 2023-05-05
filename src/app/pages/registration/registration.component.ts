import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, ValidationErrors, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {User} from "../../common/models/User";
import {ErrorMessages} from "../../common/enums/ErrorMessages";
import {AuthService} from "../../common/services/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  signUpForm = this.createForm({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  rePassword = new FormControl('');
  loading: boolean = false;

  constructor(private location: Location, private fb: FormBuilder, private authService: AuthService) {
    this.rePassword.addValidators([Validators.required]);
  }

  ngOnInit(): void {}

  createForm(model: User) {
    let formGroup = this.fb.group(model);

    formGroup.get('email')?.addValidators([
      Validators.required,
      Validators.email
    ]);
    formGroup.get('password')?.addValidators([
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^[a-zA-Z0-9]+$/)
    ]);

    return formGroup;
  }

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
      console.log(cred);
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.loading = false;
    });
  }

  goBack() { this.location.back() }
}
