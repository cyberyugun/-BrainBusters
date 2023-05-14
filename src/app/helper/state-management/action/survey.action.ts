import { createAction, props } from "@ngrx/store";
import { filterSurvey } from "../../domain/survey.model";

export const searchAction = createAction('[SURVEY] Search',
props<{ payload: filterSurvey }>());
