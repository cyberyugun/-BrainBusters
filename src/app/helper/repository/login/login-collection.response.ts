import { Login } from "../../domain/login.model";
import { HttpResponseEntity } from "../http-reposponse.entity";

export type HttpLoginCollectionResponse = HttpResponseEntity<Login>;
