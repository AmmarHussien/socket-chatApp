import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { forwardRef, Inject, Logger } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('ChatGateway');
  afterInit(server: any) {
    this.logger.log('Initialized!');
  }
  hello;
  @SubscribeMessage('chatToServer')
  async handleMessage(
    client: Socket,
    messages: {
      sender: string;
      room: string;
      message: string;
    },
  ) {
    this.wss.to(messages.room).emit('chatToClient', messages);
    this.userService.createUser(
      messages.sender,
      messages.message,
      messages.room,
    );
  }
  mshistory;

  @SubscribeMessage('GetHistory')
  async handlesMessage(
    client: Socket,
    messages: {
      sender: string;
      room: string;
      message: string;
    },
  ) {
    this.hello = await this.userService.getUsers(messages.room);
    this.mshistory = this.hello;
    this.wss.emit('ReturnClient', this.mshistory);
  }

  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }
}
