// src/common/response.helper.ts

import { Response } from 'express';
import { ApiResponse } from './response.interface';

export class ResponseHelper {
  private static sendResponse(res: Response, statusCode: number, IsSuccess: boolean, Message: string, Data?: any) {
    const response: ApiResponse = {
      Status: statusCode,
      IsSuccess: IsSuccess,
      Message: Message,
      Data: Data
    };
    return res.status(statusCode).json(response);
  }

  static sendSuccessResponse(res: Response, message: string, data?: any) {
    return this.sendResponse(res, 200, true, message, data);
  }

  static sendAcceptedResponse(res: Response, message: string, data?: any) {
    return this.sendResponse(res, 202, true, message, data);
  }

  static sendUnauthorizedResponse(res: Response, message: string) {
    return this.sendResponse(res, 401, false, message);
  }

  static sendForbiddenResponse(res: Response, message: string) {
    return this.sendResponse(res, 403, false, message);
  }

  static sendNotFoundResponse(res: Response, message: string) {
    return this.sendResponse(res, 404, false, message);
  }

  static sendBadRequestResponse(res: Response, message: string) {
    return this.sendResponse(res, 400, false, message);
  }

  static sendInternalServerErrorResponse(res: Response, message: string) {
    return this.sendResponse(res, 500, false, message);
  }

  static sendServiceUnavailableResponse(res: Response, message: string) {
    return this.sendResponse(res, 503, false, message);
  }

  static sendGatewayTimeoutResponse(res: Response, message: string) {
    return this.sendResponse(res, 504, false, message);
  }
}
