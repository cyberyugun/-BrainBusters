import { SurveyAbstract } from "../abstract/survey.abstract";
import { LoginAbstract } from "../abstract/login.abstract";
import { MockSurveyRepository } from "../repository/survey/mock/mock-survey.repository";
import { MockLoginRepository } from "../repository/login/mock/mock-login.repository";

export const mockProvider = [
  {
    provide: LoginAbstract,
    useClass: MockLoginRepository
  },
  {
    provide: SurveyAbstract,
    useClass: MockSurveyRepository
  }
]
