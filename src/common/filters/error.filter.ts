import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ErrorFilter<T> implements ExceptionFilter {

  catch(exception: T, host: ArgumentsHost) {

    const res: Response = host.switchToHttp().getResponse();

    if (exception instanceof HttpException) {

      Logger.warn(exception);
      res.status(exception.getStatus()).json({
        status: exception.getStatus(),
        message: exception.message,
      });
    } else {

      Logger.error(exception);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '서버 오류',
      });
    }
  }
}
