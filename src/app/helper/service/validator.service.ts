import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  emailValidator(control: FormControl): { [key: string]: any } | null {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { invalidEmail: true };
  }
  passwordValidator(control: FormControl): { [key: string]: any } | null {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/ ;
    const valid = passwordRegex.test(control.value);
    return valid ? null : { invalidPassword: true };
  }
}
