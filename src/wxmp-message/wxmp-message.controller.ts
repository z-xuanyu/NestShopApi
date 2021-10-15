import { Controller, Get, Req, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';


@Controller("wxmpMessage")

export class WxmpMessageController {

    @Get()
    @ApiOperation({ summary: '微信共中标接口' })
    getMsg(@Req() request: Request, @Res() response: Response) {
        
      }
}