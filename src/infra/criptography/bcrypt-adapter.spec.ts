import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt.adapter'

interface SutType {
  sut: BcryptAdapter
}

const salt = 12

function makeSut (): SutType {
  const sut = new BcryptAdapter(salt)
  return { sut }
}

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct value', async () => {
    const { sut } = makeSut()
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('any_value')
    expect(bcryptSpy).toHaveBeenNthCalledWith(1, 'any_value', salt)
  })
})
