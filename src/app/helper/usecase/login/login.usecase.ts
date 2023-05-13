import { Observable } from "rxjs";
import { LoginAbstract } from "../../abstract/login.abstract";
import { Usecase } from "../../base/usecase";
import { Login } from "../../domain/login.model";
import { HttpLoginCollectionResponse } from "../../repository/login/login-collection.response";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: "root"
})
export class LoginUsecase implements Usecase<Login, HttpLoginCollectionResponse> {
  constructor(private repository: LoginAbstract) {}
  execute(params: Login): Observable<HttpLoginCollectionResponse> {
    return this.repository.login(params);
  }
}
