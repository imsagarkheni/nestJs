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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const role_schema_1 = require("../../schemas/role.schema");
const jwt_1 = require("@nestjs/jwt");
let RoleService = class RoleService {
    constructor(roleModel, jwtService) {
        this.roleModel = roleModel;
        this.jwtService = jwtService;
    }
    async create(createRoleDto) {
        const { name } = createRoleDto;
        const existingRole = await this.roleModel.findOne({ name }).exec();
        if (existingRole) {
            throw new common_1.BadRequestException('role already exists');
        }
        const newRole = new this.roleModel(Object.assign({}, createRoleDto));
        return newRole.save();
    }
    async findById(id) {
        const role = await this.roleModel.findById(id).exec();
        if (!role) {
            throw new common_1.NotFoundException(`role with id ${id} not found`);
        }
        return role;
    }
    async findAll(page = 1, limit = 10, search) {
        const query = search ? {
            $or: [
                { username: new RegExp(search, 'i') },
                { email: new RegExp(search, 'i') }
            ]
        } : {};
        return this.roleModel.paginate(query, { page, limit });
    }
};
RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(role_schema_1.Role.name)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map