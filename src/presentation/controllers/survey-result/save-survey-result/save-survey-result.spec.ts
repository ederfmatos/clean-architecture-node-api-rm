import { LoadSurveyById, SurveyModel } from './save-survey-result.protocol'
import { SaveSurveyResultController } from './save-survey-result.controller'
import { HttpRequest } from '@/presentation/protocols'

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
})
