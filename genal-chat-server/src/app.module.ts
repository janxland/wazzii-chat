import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ChatModule } from './modules/chat/chat.module';
import { FriendModule } from './modules/friend/friend.module';
import { GroupModule } from './modules/group/group.module';
import { AuthModule } from './modules/auth/auth.module';
require('dotenv').config();
console.log(process.env);
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT) || 3306,
      username: 'chat',
      password: process.env.MYSQL_PASSWORD || "XdwsyZhA7AbLpSp5",
      database: process.env.MYSQL_DATABASE || 'chat',
      charset: "utf8mb4", // 设置chatset编码为utf8mb4
      autoLoadEntities: true,
      synchronize: true
    }),
    UserModule,
    ChatModule,
    FriendModule,
    GroupModule,
    AuthModule
  ],
})

export class AppModule {}
