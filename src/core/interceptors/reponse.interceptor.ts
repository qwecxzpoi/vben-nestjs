import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from "rxjs"
import { Response } from "express"

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>()
    return next.handle().pipe(
      map(result => ({
        code: response.statusCode,
        result,
        message: 'ok',
      }))
    )
  }
}
