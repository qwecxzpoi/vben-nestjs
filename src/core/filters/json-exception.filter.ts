import type {
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common'
import {
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import type { Request, Response } from 'express'

@Catch()
export class JsonExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    // const request = ctx.getRequest<Request>()
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR

    const message = exception.message
      ? exception.message
      : (status >= 500 ? 'Service Error' : 'Client Error')

    const errRes = {
      code: status,
      result: null,
      message,
    }
    response.status(status)
    response.header('Content-Type', 'application/json; charset=utf-8')
    response.send(errRes)
  }
}
