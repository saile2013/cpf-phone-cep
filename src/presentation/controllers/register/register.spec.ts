import { RegisterController } from './register'
import { MissingParamError } from '../../errors/missing-param-error'

describe('Register Controller', () => {
  test('Should return 400 if no cpf is provided', () => {
    const sut = new RegisterController()
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
    const sut = new RegisterController()
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
    const sut = new RegisterController()
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
})
