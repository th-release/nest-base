import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(undefined, { transports: ['websocket'] })
export class SystemGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.count('Init');
  }

  handleDisconnect(client: Socket) {
    console.log('disconnect');
  }

  handleConnection(client: Socket) {
    console.log('connect');
  }

  @SubscribeMessage('hello')
  findAll(@MessageBody() data: string) {
    console.log(data);
  }
}
