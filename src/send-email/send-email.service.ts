/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-03-29 11:40:44
 * @LastEditTime: 2021-09-18 17:28:18
 * @Description: Modify here please
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Member } from '@libs/db/models/member.model';
import * as Handlebars  from 'handlebars';
import { readFileSync } from 'fs';
import path = require('path');
@Injectable()
export class SendEmailService {
  constructor(private readonly emailService: MailerService,@InjectModel(Member)
  private readonly memberModel: ReturnModelType<typeof Member>) { };

  // 读取邮件模板
  /**
   * @description: 
   * @param {string} templateName 模板名称，提示：以template目录下，文件名为名称！
   * @param {object} data 传递模板数据 注意：类型为对象
   * @return { string } 返回 邮件模板内容
   */
   renderEmailHtml(templateName:string, data = {}): string {
    const readHtml = readFileSync(path.join(__dirname, `./send-email/template/${templateName}.html`), 'utf8');
    const renderHtml = Handlebars.compile(readHtml)
    const vHtml =  renderHtml(data)
    return vHtml;
  }
  
   sendEmail(): void {
    const data = { name: 'xauanyu54564', list: [ { title: '标题1', content: '内容一' }, { title: '标题2', content: '内容2' } ] }
    const html = this.renderEmailHtml('test', data)
    this.emailService.sendMail({
      to: '969718197@qq.com', // 接收信息的邮箱
      from: '812006298@qq.com', // 要发送邮件的邮箱
      subject: 'Love You √',
      html: html,
      // template: 'email',
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
