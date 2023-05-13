export interface SurveyData {
  id: string;
  title: string;
  questions: Survey[];
}

export interface Survey {
  id: string;
  options: Options[];
  answer: string;
  title: string;
}

export interface Options {
  id: string;
  value: string;
}

export interface filterSurvey {
  title: string;
}
