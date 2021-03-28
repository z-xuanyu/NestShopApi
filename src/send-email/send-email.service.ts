import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class SendEmailService {
  constructor(private readonly emailService: MailerService) { };

  sendEmail(){
    this.emailService.sendMail({
            to: '969718197@qq.com', // 接收信息的邮箱
            from: '812006298@qq.com', // 要发送邮件的邮箱
            subject: 'Love You √',
            html: '<b>welcome !</b><br/><p>测试邮件发送成功!</p>',
            // template: 'email',
    }).then(() => {
          console.log("邮件发送成功！")
    }).catch(() => {
          console.log("邮件发送失败")
    })
  }
}
