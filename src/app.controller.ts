import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
@Controller()
@ApiTags('文件上传')
export class AppController {
  @ApiOperation({ summary: 'Api主页' })
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  getHello(): string {
    return 'Hello World!---xuanyu<969718197@qq.com>';
  }

  // 管理端头像上传
  @ApiOperation({ summary: '管理端头像上传' })
  @Post('avatarUpload')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  async avatarUpload(@UploadedFile('file') file) {
    const imgUrl = file.url;
    return { code: 20000, data: { imgUrl, message: 'ok' } };
  }

  // 管理端商品多图上传
  @ApiOperation({ summary: '商品多图上传' })
  @Post('multiple/upload')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('files'))
  async multipleUpload(@UploadedFiles() files) {
    return files;
  }

  // H5头像上传
  @ApiOperation({ summary: 'H5端头像上传' })
  @Post('portal/avatarUpload')
  @UseGuards(AuthGuard('portalJwt'))
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  async portalAvatarUpload(@UploadedFile('file') file) {
    const imgUrl = file.url;
    return { code: 1, imgUrl, msg: 'ok' };
  }
}
