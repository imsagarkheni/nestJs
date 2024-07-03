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
exports.PermissionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const permission_schema_1 = require("../../schemas/permission.schema");
const config_1 = require("../../common/config");
const mongoose_3 = require("mongoose");
let PermissionService = class PermissionService {
    constructor(permissionModel) {
        this.permissionModel = permissionModel;
    }
    async getModals(roleId) {
        const collections = config_1.Collections;
        try {
            const results = await this.permissionModel.findOne({ roleId: roleId }).lean();
            let permissionSet = [];
            if (results) {
                let usedCollection = [];
                results.permission.forEach((perData) => {
                    collections.forEach((perCol) => {
                        if (perCol.value === perData.collectionName) {
                            permissionSet.push({
                                label: perCol.text,
                                collectionName: perData.collectionName,
                                insertUpdate: perData.insertUpdate,
                                delete: perData.delete,
                                view: perData.view,
                                export: perData.export,
                            });
                            usedCollection.push(perData.collectionName);
                        }
                    });
                });
                const unUsedCollection = collections.filter((x) => !usedCollection.includes(x.value));
                unUsedCollection.forEach((uCol) => {
                    permissionSet.push({
                        label: uCol.text,
                        collectionName: uCol.value,
                        insertUpdate: false,
                        delete: false,
                        view: false,
                        export: false,
                    });
                });
            }
            else {
                collections.forEach((perCol) => {
                    permissionSet.push({
                        label: perCol.text,
                        collectionName: perCol.value,
                        insertUpdate: false,
                        delete: false,
                        view: false,
                        export: false,
                    });
                });
            }
            return permissionSet;
        }
        catch (error) {
            throw new common_1.NotFoundException(`Permissions not found for roleId: ${roleId}`);
        }
    }
    async savePermission(roleId, permissions, updatedBy) {
        const existingPermission = await this.permissionModel.findOne({ roleId }).lean();
        if (existingPermission) {
            const result = await this.permissionModel.updateOne({ _id: existingPermission._id }, { $set: { permission: permissions, updatedBy } });
            return result.modifiedCount > 0 ? 'Permissions updated successfully' : 'Unable to update permissions';
        }
        else {
            try {
                console.log("Creating new permission with roleId and updatedBy", roleId, updatedBy);
                const newPermission = await this.permissionModel.create({
                    roleId,
                    permission: permissions,
                    updatedBy,
                    createdBy: updatedBy,
                });
                return 'Permissions saved successfully';
            }
            catch (error) {
                throw new Error('Failed to save permissions');
            }
        }
    }
    async getPermission(roleId, modelName, permissionType) {
        try {
            let objRoleID = roleId;
            if (!mongoose_3.default.Types.ObjectId.isValid(objRoleID)) {
                objRoleID = new mongoose_3.default.Types.ObjectId(roleId);
            }
            const results = await this.permissionModel.findOne({ roleId: objRoleID }).lean();
            if (results) {
                const permissions = results.permission.filter((perm) => perm.collectionName === modelName);
                if (permissions.length === 1) {
                    const perm = permissions[0];
                    switch (permissionType) {
                        case 'view':
                            return perm.view;
                        case 'insertUpdate':
                            return perm.insertUpdate;
                        case 'delete':
                            return perm.delete;
                        case 'export':
                            return perm.export;
                        default:
                            return false;
                    }
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.error('Error in getPermission:', error);
            return false;
        }
    }
};
PermissionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(permission_schema_1.Permission.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PermissionService);
exports.PermissionService = PermissionService;
//# sourceMappingURL=permission.service.js.map