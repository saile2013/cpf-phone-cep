import { RegisterController } from './register'
import { MissingParamError, InvalidParamError } from '../../errors'
import { CpfValidator } from './register-protocols'

const makeCpfValidator = (): CpfValidator => {
  class CpfValidorStub implements CpfValidator {
    isValid (cpf: string): boolean {
      return true
    }
  }
  return new CpfValidorStub()
}

interface SutTypes {
  sut: RegisterController
  cpfValidatorStub: CpfValidator
}

const makeSut = (): SutTypes => {
  const cpfValidator = makeCpfValidator()
  const sut = new RegisterController(cpfValidator)
  return {
    sut: sut,
    cpfValidatorStub: cpfValidator
  }
}

describe('Register Controller', () => {
  test('Should return 400 if no cpf is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        phone: 'any_phone',
        cep: 'any_cep'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('cpf'))
  })

  test('Should return 400 if no phone is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        cpf: 'any_cpf',
        cep: 'any_cep'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('phone'))
  })

  test('Should return 400 if no cep is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        cpf: 'any_cpf',
        phone: 'any_phone'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('cep'))
  })

  test('Should return 400 if an invalid cpf is provided', () => {
    const { sut, cpfValidatorStub } = makeSut()
    jest.spyOn(cpfValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        cpf: 'invalid_cpf',
        phone: 'any_phone',
        cep: 'any_cep'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError(httpRequest.body.cpf))
  })

  test('Should calls CPF value correct', () => {
    const { sut, cpfValidatorStub } = makeSut()
    const cpfSpy = jest.spyOn(cpfValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        cpf: 'invalid_cpf',
        phone: 'any_phone',
        cep: 'any_cep'
      }
    }
    sut.handle(httpRequest)
    expect(cpfSpy).toHaveBeenCalledWith(httpRequest.body.cpf)
  })
})
