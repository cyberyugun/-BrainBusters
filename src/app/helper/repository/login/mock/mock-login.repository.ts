import { Observable, map, of, throwError } from "rxjs";
import { LoginAbstract } from "src/app/helper/abstract/login.abstract";
import { Login } from "src/app/helper/domain/login.model";
import { HttpLoginCollectionResponse } from "../login-collection.response";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MockLoginRepository implements LoginAbstract {
  constructor() {}

  responseSuccess: HttpLoginCollectionResponse = {
    code: 200,
    message: "success",
    data: {
      username: "",
      password: ""
    },
    meta: undefined
  }
  dataSuccess: Observable<HttpLoginCollectionResponse> = of(this.responseSuccess);
  dataFail = throwError({
    code: 400,
    message: "fail",
    data: undefined,
    meta: undefined
  })

  user = {
    "username": "admin",
    "password": "P@ssw0rd"
  }
  login(params: Login): Observable<HttpLoginCollectionResponse> {
    let valid = false;
    if (this.user.username === params.username && this.user.password === params.password) {
      valid = this.loginSuccess(valid, params);
    }
    if (valid) {
      return this.dataSuccess;
    }
    return this.dataFail;
  }

  loginSuccess(valid: boolean, params: Login) {
    valid = true;
    this.responseSuccess.data.username = params.username;
    this.responseSuccess.data.password = params.password;
    this.dataSuccess = of(this.responseSuccess);
    localStorage.setItem('login', 'success');
    return valid;
  }
}

