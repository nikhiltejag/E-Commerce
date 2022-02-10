import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const responce = ctx.getResponse()
        const request = ctx.getRequest()

        const status = exception.status() ? exception.status() : HttpStatus.INTERNAL_SERVER_ERROR

        const errorResonse = {
            code: status,
            timeStamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: status === HttpStatus.INTERNAL_SERVER_ERROR ?
                'Internal Server Error' :
                exception.message || exception.message.error || null
        }

        return responce.status(status).json(errorResonse)
    }
}