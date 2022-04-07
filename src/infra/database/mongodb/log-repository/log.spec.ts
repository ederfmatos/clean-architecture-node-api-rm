import { MongoHelper } from '@/infra/database/mongodb/helpers/mongo.helper'
import { LogMongoRepository } from './log.repository'
import { Collection } from 'mongodb'

interface SutType {
  sut: LogMongoRepository
}

function makeSut (): SutType {
  const sut = new LogMongoRepository()
  return { sut }
}

describe('LogError Mongo Repository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('should create an error log on success', async () => {
    const { sut } = makeSut()

    await sut.logError('any_error')

    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
