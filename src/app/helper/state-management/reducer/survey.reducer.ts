import { createReducer, on } from "@ngrx/store";
import { filterSurvey } from "../../domain/survey.model";
import { searchAction } from "../action/survey.action";


const initialState: filterSurvey = {
  title: ""
};

export const SurveyReducer = createReducer(
  initialState,
  on(searchAction, (state, action) => {
    return {
      ...state,
        title: action.payload.title
    };
  })
)
