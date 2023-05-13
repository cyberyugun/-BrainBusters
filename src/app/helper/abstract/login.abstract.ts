import { Observable } from "rxjs";
import { Login } from "../domain/login.model";
import { HttpLoginCollectionResponse } from "../repository/login/login-collection.response";

export abstract class LoginAbstract {
  abstract login(params: Login): Observable<HttpLoginCollectionResponse>;
}
