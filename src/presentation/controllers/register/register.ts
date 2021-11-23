import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Controller } from '../../protocols/controller'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest } from '../../helpers/http-helper'

export class RegisterController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const fieldRequest = ['cpf', 'phone', 'cep']
    for (const field of fieldRequest) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
