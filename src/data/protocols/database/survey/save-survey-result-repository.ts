import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { SaveSurveyResultParams } from '@/domain/usecases/account/save-survey-result.usecase'

export interface SaveSurveyResultRepository {
  save: (SaveSurveyResultParams: SaveSurveyResultParams) => Promise<SurveyResultModel>
}
