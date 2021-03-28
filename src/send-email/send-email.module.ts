import { Module } from '@nestjs/common';
import { SendMailController } from './send-email.controller';
import { SendEmailService } from './send-email.service';

@Module({
  controllers: [SendMailController],
  providers: [SendEmailService]
})
export class SendMailModule {}
