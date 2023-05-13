import { SurveyData } from "../../domain/survey.model";
import { HttpResponseEntity } from "../http-reposponse.entity";

export type HttpSurveyCollectionResponse = SurveyData[];

export type HttpSurveyAddCollectionResponse = HttpResponseEntity<string>;
