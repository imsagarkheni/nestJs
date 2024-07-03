"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PermissionController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionController = void 0;
const common_1 = require("@nestjs/common");
const permission_service_1 = require("./permission.service");
const save_permission_dto_1 = require("./dto/save-permission.dto");
const response_helper_1 = require("../../common/response.helper");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const common_2 = require("@nestjs/common");
let PermissionController = PermissionController_1 = class PermissionController {
    constructor(permissionService) {
        this.permissionService = permissionService;
        this.logger = new common_2.Logger(PermissionController_1.name);
    }
    async getModals(res, roleId) {
        try {
            const permissions = await this.permissionService.getModals(roleId);
            response_helper_1.ResponseHelper.sendSuccessResponse(res, 'Permissions retrieved successfully', permissions);
        }
        catch (error) {
            response_helper_1.ResponseHelper.sendBadRequestResponse(res, error.message);
        }
    }
    async savePermission(savePermissionDto, req, res) {
        try {
            const { roleId, permissions } = savePermissionDto;
            const updatedBy = "sagar";
            const message = await this.permissionService.savePermission(roleId, permissions, updatedBy);
            response_helper_1.ResponseHelper.sendSuccessResponse(res, message, {});
        }
        catch (error) {
            this.logger.error(`Failed to save permissions: ${error.message}`);
            response_helper_1.ResponseHelper.sendBadRequestResponse(res, error.message);
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('getModals'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('roleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "getModals", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('savePermission'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [save_permission_dto_1.SavePermissionDto,
        Request, Object]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "savePermission", null);
PermissionController = PermissionController_1 = __decorate([
    (0, common_1.Controller)('permission'),
    __metadata("design:paramtypes", [permission_service_1.PermissionService])
], PermissionController);
exports.PermissionController = PermissionController;
//# sourceMappingURL=permission.controller.js.map