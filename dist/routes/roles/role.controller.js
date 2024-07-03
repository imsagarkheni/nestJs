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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const role_service_1 = require("./role.service");
const create_role_dto_1 = require("./dto/create-role.dto");
const response_helper_1 = require("../../common/response.helper");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const pagination_dto_1 = require("./dto/pagination.dto");
const permission_service_1 = require("../permission/permission.service");
let RoleController = class RoleController {
    constructor(roleService, permissionService) {
        this.roleService = roleService;
        this.permissionService = permissionService;
    }
    async create(createRoleDto, res) {
        try {
            const role = await this.roleService.create(createRoleDto);
            response_helper_1.ResponseHelper.sendSuccessResponse(res, 'Role registered successfully', role);
        }
        catch (error) {
            console.error(`Failed to register role: ${error.message}`);
            response_helper_1.ResponseHelper.sendBadRequestResponse(res, error.message);
        }
    }
    async findById(id, res) {
        try {
            const role = await this.roleService.findById(id);
            if (role) {
                response_helper_1.ResponseHelper.sendSuccessResponse(res, 'Role retrieved successfully', role);
            }
            else {
                response_helper_1.ResponseHelper.sendNotFoundResponse(res, 'Role not found');
            }
        }
        catch (error) {
            console.error(`Failed to retrieve role: ${error.message}`);
            response_helper_1.ResponseHelper.sendInternalServerErrorResponse(res, 'Failed to retrieve role');
        }
    }
    async findAll(paginationQuery, res) {
        const { page = 1, limit = 10, search = '' } = paginationQuery;
        try {
            const hasPermission = await this.permissionService.getPermission('66851c548e9da29b3d2fdda6', 'roles', 'view');
            if (!hasPermission) {
                response_helper_1.ResponseHelper.sendUnauthorizedResponse(res, 'You do not have permission to view roles');
                return;
            }
            const roles = await this.roleService.findAll(page, limit, search);
            response_helper_1.ResponseHelper.sendSuccessResponse(res, 'Roles retrieved successfully', roles);
        }
        catch (error) {
            console.error(`Failed to retrieve roles: ${error.message}`);
            response_helper_1.ResponseHelper.sendInternalServerErrorResponse(res, 'Failed to retrieve roles');
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "findById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "findAll", null);
RoleController = __decorate([
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [role_service_1.RoleService,
        permission_service_1.PermissionService])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map