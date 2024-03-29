/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-10-29 10:52:06
 * @Description: Banner模块控制器
 */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BannerService } from './banner.service';
import { GetBannersDto } from './dto/getBanners.dto';
import { AddBannerDto } from './dto/addBanner.dto';
import { UpdateBannerDto } from './dto/updateBanner.dto';
import { ParseIdPipe } from '@app/common/pipe/parse.id.pipe';



@Controller('banner')
@ApiTags('后台banner管理')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class BannerController {
  constructor(private bannerService:BannerService) {}


  // 获取banner列表
  @Get()
  @ApiOperation({ summary: 'banner列表' })
  async getBanners(@Query() parameters:GetBannersDto):Promise<any>{
    const result = await this.bannerService.getBanners(parameters)
    return {
      code: 1,
      message:'成功',
      result
    }
  }


  //  添加banner
  @Post()
  @ApiOperation({ summary: '添加banner' })
  async addBanner(@Body() parameters:AddBannerDto):Promise<any>{
    const result =  this.bannerService.addBanner(parameters)
    return {
      code: 1,
      message:'成功',
      result
    }
  }



  // 更新banner
  @Patch(":id")
  @ApiParam({ name: 'id', description: "bannerId" })
  @ApiOperation({ summary: '更新banner信息' })
  async updateBanner(@Param("id",new ParseIdPipe()) id:string, @Body() parameters:UpdateBannerDto ):Promise<any>{
    const result = await this.bannerService.updateBanner(id,parameters)
    return {
      code: 1,
      message:'成功',
      result
    }
  }


  // 删除banner
  @Delete(":id")
  @ApiParam({ name: 'id', description: "bannerId" })
  @ApiOperation({ summary: '删除banner' })
  async delBanner(@Param("id", new ParseIdPipe()) id:string):Promise<any>{
    const result = await this.bannerService.delBanner(id)
    return {
      code: 1,
      message:'成功',
      result
    }
  }
}
