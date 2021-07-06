/*
 * @Author: xuanyu
 * @Date: 2021-03-29 11:40:44
 * @LastEditTime: 2021-04-28 17:16:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \NestShopApi\src\send-email\send-email.controller.ts
 */
import { Controller, Get } from '@nestjs/common';
import { SendEmailService } from './send-email.service';

@Controller('send-email')
export class SendMailController {
  constructor(private readonly sendEmailSever: SendEmailService) { }
  @Get()
  sendEmail(): string {
    this.sendEmailSever.sendEmail();
    return 'ok'
  }
}
