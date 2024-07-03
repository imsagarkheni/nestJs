// src/users/dto/save-permission.dto.ts

import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class SavePermissionDto {
  @IsString()
  @IsNotEmpty()
  roleId: string;

  @IsArray()
  @IsNotEmpty()
  permissions: Array<{
    collectionName: string;
    insertUpdate: boolean;
    delete: boolean;
    view: boolean;
    export: boolean;
  }>;
}
