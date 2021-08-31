/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-12-04 10:29:30
 * @LastEditTime: 2021-08-31 14:21:22
 * @Description: Modify here please
 */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { NavigatorService } from './navigator.service';
import { AddNavigatorDto, GetNavigatorDto, UpdateNavigatorDto } from './dto/navigators.dto';
import { BaseResponseResult } from 'src/BaseResponseResult';
import { Navigator } from '@libs/db/models/navigator.model';

@Controller('navigator')
@ApiTags('后台导航管理')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class NavigatorController {
    constructor(private navigatorService: NavigatorService){};


  @Get()
  @ApiOperation({ summary: '导航列表' })
  async getUnitList(@Query() parameters: GetNavigatorDto ): Promise<any> {
    const result = await this.navigatorService.getNavigator(parameters)
    return {
      code:1,
      message: '成功',
      result
    }
  }

  @Post()
  @ApiOperation({ summary: '添加导航' })
  async addUnit(@Body() parameters:AddNavigatorDto):Promise<BaseResponseResult<Navigator>>{
    const result = await this.navigatorService.addNavigator(parameters)
    return {
      code:1,
      message: '成功',
      result
    }
  }


  @Patch(":id")
  @ApiParam({ name:'id',description:"导航id" })
  @ApiOperation({ summary: '编辑导航信息' })
  async updateUnit(@Param("id") id:string, @Body() parameters:UpdateNavigatorDto):Promise<BaseResponseResult<Navigator>>{
    const result = await this.navigatorService.updateNavigator(id, parameters)
    return {
      code:1,
      message: '成功',
      result
    }
  }

  @Delete(":id")
  @ApiParam({ name:'id',description:"导航id" })
  @ApiOperation({ summary: '删除导航信息' })
  async delUnit(@Param("id") id:string):Promise<BaseResponseResult<Navigator>>{
    const result = await this.navigatorService.delNavigator(id)
    return {
      code:1,
      message: '成功',
      result
    }
  }
}
