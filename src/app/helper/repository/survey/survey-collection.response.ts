import { SurveyData } from "../../domain/survey.model";
import { HttpResponseEntity } from "../http-reposponse.entity";

export type HttpSurveyCollectionResponse = SurveyData[];

export type HttpSurveyAddCollectionResponse = HttpResponseEntity<string>;

export type HttpSurveySubmitCollectionResponse = HttpResponseEntity<Score>;

export interface Score {
  score: number;
}
