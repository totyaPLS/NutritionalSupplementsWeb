import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
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
    this.rePassword.addValidators([Validators.required, Validators.minLength(8)]);
    this.rePassword.valueChanges.subscribe(() => {
      this.checkPasswordsMatch(this.signUpForm.get('password')?.value, this.rePassword);
      // if (!this.rePassword.valid) console.log("Hmm, mismatch...");
    });
  }

  ngOnInit(): void {}

  createForm(model: User) {
    let formGroup = this.fb.group(model);
    formGroup.get('email')?.addValidators(Validators.required);
    formGroup.get('password')?.addValidators([Validators.required, Validators.minLength(8)]);
    return formGroup;
  }

  checkPasswordsMatch(password: any, rePassword: any) {
    if (password === rePassword.value) {
      rePassword.setErrors(null);
    } else {
      rePassword.setErrors({ mismatch: true });
    }
  }

  onSubmit() {
    this.checkPasswordsMatch(this.signUpForm.get('password')?.value, this.rePassword);
    if (this.signUpForm.valid && this.rePassword.valid) {
      console.log(this.signUpForm.value);
    }
  }

  goBack() { this.location.back() }
}
