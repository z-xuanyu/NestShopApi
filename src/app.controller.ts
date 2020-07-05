import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
@Controller()
@ApiTags('主页')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  // 头像上传
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @ApiOperation({ summary: '头像上传' })
  @Post('avatarUpload')
  @UseInterceptors(FileInterceptor('file'))
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async avatarUpload(@UploadedFile('file') file) {
    const imgUrl = file.url;
    return { code: 1, imgUrl, msg: 'ok' };
  }
}
