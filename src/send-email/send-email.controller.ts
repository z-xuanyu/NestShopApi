/*
 * @Author: xuanyu
 * @Date: 2021-03-29 11:40:44
 * @LastEditTime: 2021-08-10 16:24:35
 * @LastEditors: xuanyu
 * @Description: In User Settings Edit
 * @FilePath: \NestShopApi\src\send-email\send-email.controller.ts
 */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SendEmailToMemberDto } from './dto/sendEmailToMember.dto';
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



  @Post(":id")
  @ApiParam({ name: "id", description: '会员id' })
  @ApiOperation({ summary: '发邮件给会员' })
  async sendEmailToMember(@Param("id") id: string, @Body() parameters: SendEmailToMemberDto): Promise<any> {
    const result = await this.sendEmailSever.sendEmailToMember(id, parameters.title, parameters.content)
    return result;
  }
}
