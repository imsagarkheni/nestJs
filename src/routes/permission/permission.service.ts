import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from '../../schemas/permission.schema';
import { Collections } from '../../common/config';
import { SavePermissionDto } from './dto/save-permission.dto';
import mongoose from 'mongoose';


@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>,
  ) { }

  async getModals(roleId: string): Promise<any> {
    const collections = Collections;
    try {
      // let objRoleID: any = roleId;
      // if (!mongoose.Types.ObjectId.isValid(objRoleID)) {
      //   objRoleID = new mongoose.Types.ObjectId(roleId);
      // }
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
      } else {
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
    } catch (error) {
      throw new NotFoundException(`Permissions not found for roleId: ${roleId}`);
    }
  }

  async savePermission(roleId: string, permissions: SavePermissionDto['permissions'], updatedBy: string): Promise<string> {
    const existingPermission = await this.permissionModel.findOne({ roleId }).lean();

    if (existingPermission) {
      const result = await this.permissionModel.updateOne(
        { _id: existingPermission._id },
        { $set: { permission: permissions, updatedBy } }
      );
      return result.modifiedCount > 0 ? 'Permissions updated successfully' : 'Unable to update permissions';
    } else {
      try {
        console.log("Creating new permission with roleId and updatedBy", roleId, updatedBy);
        const newPermission = await this.permissionModel.create({
          roleId,
          permission: permissions,
          updatedBy,
          createdBy: updatedBy,
        });
        return 'Permissions saved successfully';
      } catch (error) {
        throw new Error('Failed to save permissions');
      }
    }
  }

  async getPermission(roleId: string, modelName: string, permissionType: string): Promise<boolean> {
    try {
      let objRoleID: any = roleId;
      if (!mongoose.Types.ObjectId.isValid(objRoleID)) {
        objRoleID = new mongoose.Types.ObjectId(roleId);
      }

      const results = await this.permissionModel.findOne({ roleId: objRoleID }).lean();

      if (results) {
        const permissions = results.permission.filter((perm: any) => perm.collectionName === modelName);

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
        } else {
          return false; // No matching modelName found
        }
      } else {
        return false; // No permissions found for the roleId
      }
    } catch (error) {
      console.error('Error in getPermission:', error);
      return false; // Return false in case of any error
    }
  }
}
