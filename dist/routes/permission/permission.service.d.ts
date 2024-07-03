import { Model } from 'mongoose';
import { PermissionDocument } from '../../schemas/permission.schema';
import { SavePermissionDto } from './dto/save-permission.dto';
export declare class PermissionService {
    private permissionModel;
    constructor(permissionModel: Model<PermissionDocument>);
    getModals(roleId: string): Promise<any>;
    savePermission(roleId: string, permissions: SavePermissionDto['permissions'], updatedBy: string): Promise<string>;
    getPermission(roleId: string, modelName: string, permissionType: string): Promise<boolean>;
}
