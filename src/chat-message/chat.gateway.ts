/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-24 10:12:58
 * @LastEditTime: 2021-10-29 10:38:26
 * @Description: socket 网关
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
  
    // 聊天室发送信息
    @SubscribeMessage('msgToServer')
    public handleMessage(client: Socket, payload: any): Promise<WsResponse<any>> {
      return this.server.to(payload.room).emit('msgToClient', payload);
    }
  
    /**
     * 多人聊天室
     *
     * @param {Socket} client Socket
     * @param {string} room 多人聊天房间id
     * @memberof MessageGateway
     */
    @SubscribeMessage('joinRoom')
    public joinRoom(client: Socket, room: string): void {
      client.join(room);
      client.emit('joinedRoom', room);
      console.log('建立连接')
    }
    
    // 信息推送
    @SubscribeMessage("pushMessge")
    public handlePush(client: Socket, payload):void{
      console.log(payload,45646)
      client.emit("pushSu",{ msg: '收到信息' })
    }

    // 断开多人聊天室
    /**
     * @param {Socket} client Socket
     * @param {string} room 房间id
     * @memberof MessageGateway
     */
    @SubscribeMessage('leaveRoom')
    public leaveRoom(client: Socket, room: string): void {
      client.leave(room);
      client.emit('leftRoom', room);
      console.log("断开连接")
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