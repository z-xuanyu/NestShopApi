import { Controller, Get } from '@nestjs/common';
import { SendEmailService } from './send-email.service';

@Controller('send-email')
export class SendMailController {
  constructor(private readonly sendEmailSever:SendEmailService){}
  @Get()
  sendEmail() {
    
    this.sendEmailSever.sendEmail();
    return 'ok'
  }
}
