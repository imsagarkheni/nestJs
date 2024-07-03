// src/users/user.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from '../../schemas/user.schema';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
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
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class UserModule { }
