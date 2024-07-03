// src/users/user.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role, RoleSchema } from '../../schemas/role.schema';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Role.name,
        useFactory: () => {
          const schema = RoleSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
      },
    ]),
    JwtModule.register({
      secret: 'sagarsecretkey',
      signOptions: { expiresIn: '24h' },
    }),
    PermissionModule,
  ],
  controllers: [RoleController],
  providers: [
    RoleService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class RoleModule { }
