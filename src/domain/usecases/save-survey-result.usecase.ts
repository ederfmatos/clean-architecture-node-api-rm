import { SurveyResultModel } from '@/domain/models/survey-result.model'

export type SaveSurveyResultModel = Omit<SurveyResultModel, 'id'>

export type SaveSurveyResult = {
  save: (addSurveyModel: SaveSurveyResultModel) => Promise<SurveyResultModel>
}