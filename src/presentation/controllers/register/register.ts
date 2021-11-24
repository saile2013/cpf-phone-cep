import { HttpRequest, HttpResponse, Controller } from '../../protocols'
import { CpfValidator } from './register-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'

export class RegisterController implements Controller {
  private readonly cpfValidator: CpfValidator

  constructor (cpfValidator: CpfValidator) {
    this.cpfValidator = cpfValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const fieldRequest = ['cpf', 'phone', 'cep']
    for (const field of fieldRequest) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const { cpf } = httpRequest.body
    const isValid = this.cpfValidator.isValid(cpf)
    if (!isValid) {
      return badRequest(new InvalidParamError(cpf))
    }
  }
}
