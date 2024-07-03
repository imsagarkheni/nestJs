import { Response } from 'express';
export declare class ResponseHelper {
    private static sendResponse;
    static sendSuccessResponse(res: Response, message: string, data?: any): Response<any, Record<string, any>>;
    static sendAcceptedResponse(res: Response, message: string, data?: any): Response<any, Record<string, any>>;
    static sendUnauthorizedResponse(res: Response, message: string): Response<any, Record<string, any>>;
    static sendForbiddenResponse(res: Response, message: string): Response<any, Record<string, any>>;
    static sendNotFoundResponse(res: Response, message: string): Response<any, Record<string, any>>;
    static sendBadRequestResponse(res: Response, message: string): Response<any, Record<string, any>>;
    static sendInternalServerErrorResponse(res: Response, message: string): Response<any, Record<string, any>>;
    static sendServiceUnavailableResponse(res: Response, message: string): Response<any, Record<string, any>>;
    static sendGatewayTimeoutResponse(res: Response, message: string): Response<any, Record<string, any>>;
}
