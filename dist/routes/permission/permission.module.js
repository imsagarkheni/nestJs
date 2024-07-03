"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const permission_service_1 = require("./permission.service");
const permission_controller_1 = require("./permission.controller");
const permission_schema_1 = require("../../schemas/permission.schema");
const mongoosePaginate = require("mongoose-paginate-v2");
const jwt_1 = require("@nestjs/jwt");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const core_1 = require("@nestjs/core");
let PermissionModule = class PermissionModule {
};
PermissionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: permission_schema_1.Permission.name,
                    useFactory: () => {
                        const schema = permission_schema_1.PermissionSchema;
                        schema.plugin(mongoosePaginate);
                        return schema;
                    },
                },
            ]),
            jwt_1.JwtModule.register({
                secret: 'sagarsecretkey',
                signOptions: { expiresIn: '24h' },
            }),
        ],
        controllers: [permission_controller_1.PermissionController],
        providers: [
            permission_service_1.PermissionService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
        exports: [permission_service_1.PermissionService],
    })
], PermissionModule);
exports.PermissionModule = PermissionModule;
//# sourceMappingURL=permission.module.js.map