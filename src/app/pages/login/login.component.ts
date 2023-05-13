import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/helper/service/validator.service';
import { LoginUsecase } from 'src/app/helper/usecase/login/login.usecase';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export default class LoginComponent {

  constructor(private validatorService: ValidatorService,
    private loginUsecase: LoginUsecase,
    private snackbar: MatSnackBar,
    private router: Router) {
  }
  dynamicForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, this.validatorService.passwordValidator])
  });

  get usernameRequiredErrors()  {
    const error = this.dynamicForm.get('username')?.errors as any;
    return this.dynamicForm.get('username')?.errors ? error['required'] : false;
  }

  get passwordRequiredErrors()  {
    const error = this.dynamicForm.get('password')?.errors as any;
    return this.dynamicForm.get('password')?.errors ? error['required'] : false;
  }

  get passwordInvalidErrors()  {
    const error = this.dynamicForm.get('password')?.errors as any;
    return this.dynamicForm.get('password')?.errors? error['invalidPassword'] : false;
  }

  onSubmit(value: FormGroup) {
    if (value.valid) {
      this.loginUsecase.execute(value.value).subscribe(
        (response) => {
          this.router.navigateByUrl('/survey')
        },
        (err) => {
          this.snackbar.open('Login failed', '', {
            duration: 3000
          });
        }
      )
    }
  }
}
