import { LoadSurveyById, HttpRequest, InvalidParamError, SurveyModel, InternalServerError } from './save-survey-result.protocol'
import { SaveSurveyResultController } from './save-survey-result.controller'
import { forbidden, serverError } from '@/presentation/helpers/http/http.helper'

type SutType = {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
}

function makeSut (): SutType {
  const loadSurveyByIdStub = makeLoadSurveyByIdStub()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub)
  return { sut, loadSurveyByIdStub }
}

function makeLoadSurveyByIdStub (): LoadSurveyById {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return makeSurvey()
    }
  }

  return new LoadSurveyByIdStub()
}

function makeSurvey (): SurveyModel {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ],
    date: new Date()
  }
}

function makeFakeRequest (): HttpRequest {
  return {
    params: {
      surveyId: 'any_id'
    },
    body: {
      answer: 'any_answer'
    }
  }
}

describe('SaveSurveyResult Controller', () => {
  test('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')

    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenNthCalledWith(1, 'any_id')
  })

  test('should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(null)
    const request = makeFakeRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockRejectedValue(new Error('any message'))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new InternalServerError()))
  })

  test('should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    request.body = { answer: 'invalid_answer' }

    const response = await sut.handle(request)
    expect(response).toEqual(forbidden(new InvalidParamError('answer')))
  })
})
