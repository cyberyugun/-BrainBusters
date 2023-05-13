import { Observable } from "rxjs";

export interface Usecase<S, T> {
  execute(params: S): Observable<T>;
 }
