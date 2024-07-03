// src/app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './routes/user/user.module';
import { DatabaseModule } from './db/database.module';
import { LoggingMiddleware } from './common/middleware/logging.middleware';
import { RoleModule } from './routes/roles/role.module';
import { PermissionModule } from './routes/permission/permission.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, UserModule,RoleModule, PermissionModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => ({ collections: require('./common/config').Collections })],
    })
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
