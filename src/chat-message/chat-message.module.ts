/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-24 10:09:42
 * @LastEditTime: 2021-09-28 16:11:00
 * @Description: Modify here please
 */
import { Module } from '@nestjs/common';
import { MessageGateway } from './chat.gateway';

@Module({
  imports:[],
  controllers: [],
  providers: [MessageGateway]
})
export class ChatMessageModule {}
