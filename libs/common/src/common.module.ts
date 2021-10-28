/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-10-15 15:19:37
 * @Description: 全局公共模块
 */
import { Module, Global } from '@nestjs/common';
import { CommonService } from './common.service';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from '@libs/db';
import { ConfigModule } from '@nestjs/config'
@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: process.env.JWT_SECRET,
        };
      },
    }),
    DbModule,
    ConfigModule.forRoot({
      isGlobal:true
    })
  ],
  providers: [CommonService],
  exports: [CommonService, JwtModule],
})
export class CommonModule {}
