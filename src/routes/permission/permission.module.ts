
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { Permission, PermissionSchema } from '../../schemas/permission.schema';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Permission.name,
        useFactory: () => {
          const schema = PermissionSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
      },
    ]),
    JwtModule.register({
      secret: 'sagarsecretkey',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [PermissionController],
  providers: [
    PermissionService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [PermissionService],
})
export class PermissionModule { }
