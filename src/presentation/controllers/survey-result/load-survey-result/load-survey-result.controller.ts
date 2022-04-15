import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './load-survey-result.protocol'
import { forbidden, serverError } from '@/presentation/helpers/http/http.helper'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error.error'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params

      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
