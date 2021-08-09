/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-08-09 16:16:57
 * @Description: Modify here please
 */
import { Controller, UseGuards, Get, Query, Patch, Param, Delete, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetTagListDto } from './dto/getTagList.dto';
import { TagsService } from './tags.service';
import { AddTagDto } from './dto/addTag.dto';
import { Tag } from '@libs/db/models/tag.model';
import { UpdateTagDto } from './dto/updateTag.dto';


@Controller('tags')
@ApiTags('后台标签管理')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class TagsController {
  constructor(
   private tagService:TagsService
  ) {}



  // 获取标签列表
  @ApiOperation({ summary: '标签列表' })
  @Get()
  async tagList(@Query() parameters: GetTagListDto):Promise<any> {
    const result = await this.tagService.getTags(parameters)
    return {
      code:1,
      message:'成功',
      result
    }
  }


  // 添加标签
  @Post()
  @ApiOperation( { summary: '添加标签' } )
  async addTag(@Body() parameters: AddTagDto):Promise<Tag>{
    const result = await this.tagService.addTag(parameters);
    return result;
  }


  // 更新标签信息
  @Patch(":id")
  @ApiParam({ name: 'id', description: '标签id' })
  @ApiOperation( { summary: '更新标签信息' } )
  async updateTag(@Param('id') id: string,parameters:UpdateTagDto):Promise<Tag>{
    return this.tagService.updateTag(id, parameters)
  }


  // 删除标签
  @Delete()
  @ApiParam({ name: 'id', description: '标签id' })
  @ApiOperation( { summary: '删除标签' } )
  async delTag(@Param('id') id: string):Promise<Tag>{
    return this.tagService.delTag(id)
  }
}
