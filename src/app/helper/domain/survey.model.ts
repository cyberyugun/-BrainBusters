export interface SurveyData {
  id: string;
  title: string;
  introduction: string;
  type: number;
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
