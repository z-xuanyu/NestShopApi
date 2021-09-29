/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-24 10:12:58
 * @LastEditTime: 2021-09-28 17:04:11
 * @Description: Modify here please
 */
import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WsResponse,
  } from '@nestjs/websockets';
  import { Logger } from '@nestjs/common';
  import { Socket } from 'socket.io';
  import { Server } from 'ws';
  
  @WebSocketGateway({ namespace: '/chat' })
  export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
    @WebSocketServer() server: Server;
  
    private logger: Logger = new Logger('MessageGateway');
  
    // 发送信息
    @SubscribeMessage('msgToServer')
    public handleMessage(client: Socket, payload: any): Promise<WsResponse<any>> {
      return this.server.to(payload.room).emit('msgToClient', payload);
    }
  
    // 建立聊天
    @SubscribeMessage('joinRoom')
    public joinRoom(client: Socket, room: string): void {
      client.join(room);
      client.emit('joinedRoom', room);
    }
  
    // 断开聊天
    @SubscribeMessage('leaveRoom')
    public leaveRoom(client: Socket, room: string): void {
      client.leave(room);
      client.emit('leftRoom', room);
    }
  
    // 初始化
    public afterInit(server: Server): void {
      return this.logger.log('Init');
    }
  
    public handleDisconnect(client: Socket): void {
      return this.logger.log(`Client disconnected: ${client.id}`);
    }
  
    public handleConnection(client: Socket): void {
      return this.logger.log(`Client connected: ${client.id}`);
    }
  }