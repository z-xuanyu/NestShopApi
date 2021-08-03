/*
 * @Author: xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-08-03 16:44:14
 * @LastEditors: xuanyu
 * @Description: In User Settings Edit
 * @FilePath: \NestShopApi\src\app.controller.ts
 */
import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody, ApiProperty } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

class multipleFileUploadDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
}

@Controller()
@ApiTags('文件上传')
export class AppController {
  @ApiOperation({ summary: 'Api主页' })
  @Get()
  getHello(): string {
    return 'Hello World!---xuanyu<969718197@qq.com>';
  }

  // 管理端头像上传
  @ApiOperation({ summary: '管理端头像上传' })
  @Post('avatarUpload')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '头像上传',
    type: FileUploadDto,
  })
  async avatarUpload(@UploadedFile('file') file): Promise<any> {
    return { code: 1, result: { url: file.url, message: 'ok' } };
  }

  // 管理端商品多图上传
  @ApiOperation({ summary: '商品多图上传' })
  @Post('multiple/upload')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '多图上传',
    type: multipleFileUploadDto,
  })
  async multipleUpload(@UploadedFiles() files: Array<any>): Promise<any> {
    return {
      code:1,
      result:files,
      message: '成功'
    };
  }

  // H5头像上传
  @ApiOperation({ summary: 'H5端头像上传' })
  @Post('portal/avatarUpload')
  @UseGuards(AuthGuard('portalJwt'))
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '头像上传',
    type: FileUploadDto,
  })
  async portalAvatarUpload(@UploadedFile('file') file): Promise<any> {
    return { code: 1, result:file, msg: '成功' };
  }
}
