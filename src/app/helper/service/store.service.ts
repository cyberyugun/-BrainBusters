import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SurveyData, filterSurvey } from "../domain/survey.model";
import { Store } from "@ngrx/store";
import { searchAction } from "../state-management/action/survey.action";

@Injectable()
export class StoreService {
  public survey = new BehaviorSubject<SurveyData[]>([]);
  currentSurvey = this.survey.asObservable();
  public searchString = new BehaviorSubject<filterSurvey>({
    title: ''
  });
  currentSearchString = this.searchString.asObservable();
  constructor(private store: Store<filterSurvey>) {}

  setSearch(survey: filterSurvey) {
    this.store.dispatch(searchAction({payload: survey}));
  }

  addSurvey(user: SurveyData[]) {
    let arr = JSON.parse(localStorage.getItem('survey') as string);
    if (arr) {
      arr.unshift(...user);
    } else {
      arr = [];
      arr.push(...user)
    }
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
      questions: user.questions,
      introduction: user.introduction,
      type: user.type
    }
    arr[index] = survey;
    localStorage.setItem('survey', JSON.stringify(arr));
    this.survey.next(arr);
  }

  getSurveyScore(user: SurveyData) {
    let arr = JSON.parse(localStorage.getItem('survey') as string) as SurveyData[];
    const index = arr.findIndex(data => data.id === user.id);
    const scorePerQuestion = 100 / arr[index].questions.length;
    let score = 0;
    arr[index].questions.forEach(question => {
      const filter = user.questions.filter(uq => uq.answer === question.answer);
      if (filter.length > 0) {
        score += scorePerQuestion;
      }
    });
    return Math.round(score);
  }
}
