import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PermissionDocument = Permission & Document;

@Schema({ timestamps: true })
export class Permission {
  @Prop({ required: true })
  roleId: string;

  @Prop({ 
    type: [{ 
      collectionName: String, 
      insertUpdate: Boolean, 
      delete: Boolean, 
      view: Boolean, 
      export: Boolean 
    }], 
    default: [] 
  })
  permission: {
    collectionName: string;
    insertUpdate: boolean;
    delete: boolean;
    view: boolean;
    export: boolean;
  }[];

  @Prop({ required: true })
  updatedBy: string;

  @Prop({ required: true })
  createdBy: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
