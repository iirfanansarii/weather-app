import { ErrorMessage } from '../../constants/app.enum';
import { HttpStatus } from '@nestjs/common';

export interface IError {
  badRequest: IErrorObject;
  unProcess: IErrorObject;
  internalServerError: IErrorObject;
  noUserFound: IErrorObject;
  notAccept: IErrorObject;
}

export interface IErrorObject {
  errorMsg: string;
  errorCode: number;
}

export const ErrorType: IError = {
  badRequest: {
    errorMsg: ErrorMessage.BadRequest,
    errorCode: HttpStatus.BAD_REQUEST,
  },
  internalServerError: {
    errorMsg: ErrorMessage.InternalServerError,
    errorCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  unProcess: {
    errorMsg: ErrorMessage.UnProcess,
    errorCode: HttpStatus.UNPROCESSABLE_ENTITY,
  },
  noUserFound: {
    errorMsg: ErrorMessage.NoUserFound,
    errorCode: HttpStatus.UNPROCESSABLE_ENTITY,
  },
  notAccept: { errorMsg: '', errorCode: HttpStatus.NOT_ACCEPTABLE },
};
