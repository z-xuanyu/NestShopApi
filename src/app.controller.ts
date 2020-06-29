import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags("主页")
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
