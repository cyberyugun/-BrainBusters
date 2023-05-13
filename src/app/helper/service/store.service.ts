import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SurveyData, filterSurvey } from "../domain/survey.model";

@Injectable()
export class StoreService {
  public survey = new BehaviorSubject<SurveyData[]>([]);
  currentSurvey = this.survey.asObservable();
  public searchString = new BehaviorSubject<filterSurvey>({
    title: ''
  });
  currentSearchString = this.searchString.asObservable();

  setSearch(survey: filterSurvey) {
    this.searchString.next(survey);
  }

  addSurvey(user: SurveyData[]) {
    let arr = JSON.parse(localStorage.getItem('survey') as string);
    arr.unshift(...user);
    this.survey.next(arr);
  }

  getDetailSurvey(id: string) {
    let arr = JSON.parse(localStorage.getItem('survey') as string) as SurveyData[];
    let filter = arr.filter((data) => data.id === id);
    return filter;
  }

  deleteSurvey(user: SurveyData) {
    let arr = JSON.parse(localStorage.getItem('survey') as string) as SurveyData[];
    const index = arr.findIndex(data => data.id === user.id);
    arr.splice(index, 1);
    localStorage.setItem('survey', JSON.stringify(arr));
    this.survey.next(arr);
  }

  editSurvey(user: SurveyData) {
    let arr = JSON.parse(localStorage.getItem('survey') as string) as SurveyData[];
    const index = arr.findIndex(data => data.id === user.id);
    let survey: SurveyData = {
      id: user.id,
      title: user.title,
      questions: user.questions
    }
    arr[index] = survey;
    localStorage.setItem('survey', JSON.stringify(arr));
    this.survey.next(arr);
  }
}
