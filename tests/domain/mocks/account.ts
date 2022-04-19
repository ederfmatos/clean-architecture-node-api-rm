import { AccountModel } from '@/domain/models'
import { Authentication, AddAccount } from '@/domain/usecases'

export function mockAccountModel (): AccountModel {
  return {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'hashed_password'
  }
}

export function mockAccountModelWithToken (role?: string): AccountModel & {role?: string} {
  return {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'hashed_password',
    accessToken: 'any_token',
    role
  }
}

export function mockAddAccountParams (): AddAccount.Params {
  return {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  }
}

export function mockAuthenticationParams (): Authentication.Params {
  return {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
}
