/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-09-10 10:10:36
 * @Description: Modify here please
 */
import { Module } from '@nestjs/common';
import { ProtalHomeController } from './protal-home.controller';
import { ProtalHomeService } from './protal-home.service';

@Module({
  controllers: [ProtalHomeController],
  providers: [ProtalHomeService]
})
export class ProtalHomeModule {}
