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
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const login_user_dto_1 = require("./dto/login-user.dto");
const response_helper_1 = require("../../common/response.helper");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const common_2 = require("@nestjs/common");
const pagination_dto_1 = require("./dto/pagination.dto");
let UserController = UserController_1 = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_2.Logger(UserController_1.name);
    }
    async register(createUserDto, res) {
        try {
            const user = await this.userService.register(createUserDto);
            response_helper_1.ResponseHelper.sendSuccessResponse(res, 'User registered successfully', user);
        }
        catch (error) {
            this.logger.error(`Failed to register user: ${error.message}`);
            response_helper_1.ResponseHelper.sendBadRequestResponse(res, error.message);
        }
    }
    async login(loginUserDto, res) {
        try {
            const token = await this.userService.login(loginUserDto);
            response_helper_1.ResponseHelper.sendSuccessResponse(res, 'Login successful', token);
        }
        catch (error) {
            this.logger.error(`Failed to login: ${error.message}`);
            response_helper_1.ResponseHelper.sendUnauthorizedResponse(res, error.message);
        }
    }
    async findById(id, res) {
        try {
            const user = await this.userService.findById(id);
            if (user) {
                response_helper_1.ResponseHelper.sendSuccessResponse(res, 'User retrieved successfully', user);
            }
            else {
                response_helper_1.ResponseHelper.sendNotFoundResponse(res, 'User not found');
            }
        }
        catch (error) {
            this.logger.error(`Failed to retrieve user: ${error.message}`);
            response_helper_1.ResponseHelper.sendInternalServerErrorResponse(res, 'Failed to retrieve user');
        }
    }
    async findAll(dto, res) {
        try {
            const user = await this.userService.findAll(dto);
            if (user) {
                response_helper_1.ResponseHelper.sendSuccessResponse(res, 'User retrieved successfully', user);
            }
            else {
                response_helper_1.ResponseHelper.sendNotFoundResponse(res, 'User not found');
            }
        }
        catch (error) {
            this.logger.error(`Failed to retrieve user: ${error.message}`);
            response_helper_1.ResponseHelper.sendInternalServerErrorResponse(res, 'Failed to retrieve user');
        }
    }
    async findByIdAndUpdate(id, updateUserDto, res) {
        try {
            const updatedUser = await this.userService.ggggg(id, updateUserDto);
            if (updatedUser) {
                response_helper_1.ResponseHelper.sendSuccessResponse(res, 'User updated successfully', updatedUser);
            }
            else {
                response_helper_1.ResponseHelper.sendNotFoundResponse(res, 'User not found');
            }
        }
        catch (error) {
            this.logger.error(`Failed to update user: ${error.message}`);
            response_helper_1.ResponseHelper.sendInternalServerErrorResponse(res, 'Failed to update user');
        }
    }
    async deleteById(id, res) {
        try {
            const deletedUser = await this.userService.deleteById(id);
            if (deletedUser) {
                response_helper_1.ResponseHelper.sendSuccessResponse(res, 'User deleted successfully', deletedUser);
            }
        }
        catch (error) {
            this.logger.error(`Failed to delete user: ${error.message}`);
            response_helper_1.ResponseHelper.sendSuccessResponse(res, 'User not found', 0);
        }
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByIdAndUpdate", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteById", null);
UserController = UserController_1 = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map