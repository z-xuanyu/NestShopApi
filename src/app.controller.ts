import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FileInterceptor('file'))
  async avatarUpload(@UploadedFile('file') file) {
    return {
      code: 1,
      avatarUrl: `http://localhost:3000/uploads/${file.filename}`,
      msg: 'ok',
    };
  }

  // 后台管理员登录
  @ApiOperation({ summary: '后台登录' })
  @Post('adminLogin')
  async adminLogin() {
    return '登录成功';
  }

  // h5端会员注册
  @ApiOperation({ summary: 'H5端会员注册' })
  @Post('portalRegister')
  async portalRegister() {
    return '注册成功';
  }

  // h5端会员登录
  @ApiOperation({ summary: 'H5端会员登录' })
  @Post('portalLogin')
  async portalLogin() {
    return '登录成功';
  }
}
