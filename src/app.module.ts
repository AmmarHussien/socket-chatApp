import { Module } from '@nestjs/common';
import { AlertGateway } from './alert/alert.gateway';
import { AlertController } from './alert/alert.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/demo'), UserModule],
  controllers: [AlertController],
  providers: [ChatGateway, AlertGateway],
})
export class AppModule {}
