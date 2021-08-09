/*
 * @Author: xuanyu
 * @Date: 2021-03-29 11:40:44
 * @LastEditTime: 2021-08-09 16:19:29
 * @LastEditors: xuanyu
 * @Description: In User Settings Edit
 * @FilePath: \NestShopApi\src\send-email\send-email.controller.ts
 */
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendEmailService } from './send-email.service';


@ApiTags("邮件服务")
@Controller('send-email')
export class SendMailController {
  constructor(private readonly sendEmailSever: SendEmailService) { }
  @Get()
  sendEmail(): string {
    this.sendEmailSever.sendEmail();
    return 'ok'
  }
}
