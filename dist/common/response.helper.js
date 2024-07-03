"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHelper = void 0;
class ResponseHelper {
    static sendResponse(res, statusCode, IsSuccess, Message, Data) {
        const response = {
            Status: statusCode,
            IsSuccess: IsSuccess,
            Message: Message,
            Data: Data
        };
        return res.status(statusCode).json(response);
    }
    static sendSuccessResponse(res, message, data) {
        return this.sendResponse(res, 200, true, message, data);
    }
    static sendAcceptedResponse(res, message, data) {
        return this.sendResponse(res, 202, true, message, data);
    }
    static sendUnauthorizedResponse(res, message) {
        return this.sendResponse(res, 401, false, message);
    }
    static sendForbiddenResponse(res, message) {
        return this.sendResponse(res, 403, false, message);
    }
    static sendNotFoundResponse(res, message) {
        return this.sendResponse(res, 404, false, message);
    }
    static sendBadRequestResponse(res, message) {
        return this.sendResponse(res, 400, false, message);
    }
    static sendInternalServerErrorResponse(res, message) {
        return this.sendResponse(res, 500, false, message);
    }
    static sendServiceUnavailableResponse(res, message) {
        return this.sendResponse(res, 503, false, message);
    }
    static sendGatewayTimeoutResponse(res, message) {
        return this.sendResponse(res, 504, false, message);
    }
}
exports.ResponseHelper = ResponseHelper;
//# sourceMappingURL=response.helper.js.map