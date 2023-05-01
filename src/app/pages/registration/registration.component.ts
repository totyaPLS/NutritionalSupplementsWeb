import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, ValidationErrors, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {User} from "../../common/models/User";

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

  constructor(private location: Location, private fb: FormBuilder) {
    this.rePassword.addValidators([Validators.required]);
    this.rePassword.valueChanges.subscribe(() => {
      this.checkPasswordsMatch(this.signUpForm.get('password')?.value, this.rePassword);
    });
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

  checkPasswordsMatch(password: any, rePassword: any) {
    if (password === rePassword.value) {
      rePassword.setErrors(null);
    } else {
      rePassword.setErrors({ mismatch: true });
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
      return 'This field is required';
    }

    if (this.signUpForm.controls['email'].hasError('email')) {
      return 'Please give a valid e-mail format';
    }

    return '';
  }

  getPasswordError() {
    if (this.signUpForm.controls['password'].hasError('required')) {
      return 'This field is required.';
    }

    if ((this.signUpForm.controls['password'].hasError('pattern'))) {
      return 'No special characters allowed';
    }

    if (!(this.signUpForm.controls['password'].hasError('minLength'))) {
      return 'Too short (min. 8 character)';
    }

    return '';
  }

  getRePasswordError() {
    if (this.rePassword.hasError('mismatch')) {
      return 'This does not match with the password';
    }

    return '';
  }

  onSubmit() {
    this.checkPasswordsMatch(this.signUpForm.get('password')?.value, this.rePassword);
    if (this.signUpForm.valid && this.rePassword.valid) {
      console.log(this.signUpForm.value);
    }
  }

  goBack() { this.location.back() }
}
