import { ArgumentsHost, Catch, HttpServer, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ErrorMessage, UserMessageCheckKeys } from '../../constants/app.enum';
import { ErrorType } from '../data-validate-exception-handlers/error-types';
import logger from '../../../../logger';

@Catch()
export class CustomHttpExceptionFilter extends BaseExceptionFilter {
  constructor(applicationRef: HttpServer) {
    super(applicationRef);
  }
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const requestId = request.__context_metadata.requestId;
    const status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;
    let message;

    switch (status) {
      case HttpStatus.BAD_REQUEST:
        const responseMessage = exception.response.message;
        message =
          responseMessage?.length === 1 &&
          responseMessage[0].toString().startsWith(UserMessageCheckKeys.User)
            ? responseMessage[0].toString()
            : ErrorMessage.BadRequest;
        break;
      case HttpStatus.FORBIDDEN:
        message = ErrorMessage.NotFound;
        break;
      case HttpStatus.UNAUTHORIZED:
        message = ErrorMessage.NotFound;
        break;
      case HttpStatus.UNPROCESSABLE_ENTITY:
        message = exception?.response?.message || ErrorType.unProcess.errorMsg;
        break;
      default:
        message = ErrorMessage.InternalServerError;
        break;
    }
    const loggerError: Error = {
      name: exception.message,
      message: exception.response,
      stack: exception.stack,
    };
    logger.error(
      requestId +
        ' : ' +
        loggerError.name +
        ' - ' +
        exception?.response?.message,
      loggerError,
    );
    response.status(status).json({
      statusCode: status,
      requestId,
      message,
    });
  }
}
