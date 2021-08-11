/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-03-29 11:40:44
 * @LastEditTime: 2021-08-10 16:03:00
 * @Description: Modify here please
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Member } from '@libs/db/models/member.model';
@Injectable()
export class SendEmailService {
  constructor(private readonly emailService: MailerService,@InjectModel(Member)
  private readonly memberModel: ReturnModelType<typeof Member>) { };

  sendEmail(): void {
    this.emailService.sendMail({
      to: '969718197@qq.com', // 接收信息的邮箱
      from: '812006298@qq.com', // 要发送邮件的邮箱
      subject: 'Love You √',
      // html: '<b>welcome !</b><br/><p>测试邮件发送成功!</p>',
      template: 'email',
    }).then(() => {
      console.log("邮件发送成功！")
    }).catch(() => {
      console.log("邮件发送失败")
    })
    // console.log(process)
  }


  // 发邮件给会员
  async sendEmailToMember(memberId: string, title = '标题', content = "<b>welcome !</b>" ):Promise<any> {
    // 认证会员id是否正确
    const isObjectId = mongoose.Types.ObjectId.isValid(memberId)
    if(!isObjectId) {
      throw new HttpException('会员Id有误!', HttpStatus.OK);
    }
    const memberInfo = await this.memberModel.findOne({ _id: memberId })
    if(!memberInfo) {
      throw new HttpException('会员不存在', HttpStatus.OK);
    }
    if(!memberInfo.email) {
      throw new HttpException('会员Email不存在', HttpStatus.OK);
    }
   const result =  await this.emailService.sendMail({
      from:'812006298@qq.com',
      to: memberInfo.email,
      subject: title,
      html: content
    })
  
    return result
  }
}
