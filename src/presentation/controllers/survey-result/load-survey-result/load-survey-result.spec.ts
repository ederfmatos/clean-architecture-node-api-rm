import { mockLoadSurveyById } from '@/presentation/test'
import { LoadSurveyResultController } from './load-survey-result.controller'
import { HttpRequest, LoadSurveyById } from './load-survey-result.protocol'

type SutType = {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
}

function makeSut (): SutType {
  const loadSurveyByIdStub = mockLoadSurveyById()
  const sut = new LoadSurveyResultController(loadSurveyByIdStub)

  return {
    sut,
    loadSurveyByIdStub
  }
}

function mockRequest (): HttpRequest {
  return {
    params: {
      surveyId: 'any_id'
    }
  }
}

describe('LoadSurveyResult Controller', () => {
  test('should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadSurveyByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(mockRequest())
    expect(loadSurveyByIdSpy).toHaveBeenNthCalledWith(1, 'any_id')
  })
})
