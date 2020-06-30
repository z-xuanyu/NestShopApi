import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
// eslint-disable-next-line @typescript-eslint/class-name-casing
@Controller()
@ApiTags('主页')
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  // 头像上传
  @ApiOperation({ summary: '头像上传' })
  @Post('avatarUpload')
  @UseInterceptors(FilesInterceptor('file'))
  async avatarUpload(@UploadedFile('file') file) {
    return {
      url: `http://localhost:3000/uploads/${file.filename}`,
    };
  }
}
