/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-08-31 14:26:21
 * @Description: Modify here please
 */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UnitService } from './unit.service';
import { GetUnitsDto } from './dto/getUnits.dto';
import { AddOrUpdateUnitDto } from './dto/addOrUpdateUnit.dto';
import { BaseResponseResult } from 'src/BaseResponseResult';
import { Unit } from '@libs/db/models/unit.model';

@Controller('unit')
@ApiTags('后台商品单位管理')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UnitController {

  constructor(private unitService: UnitService) { }

  
  @Get()
  @ApiOperation({ summary: '单位名称列表' })
  async getUnitList(@Query() parameters:GetUnitsDto ): Promise<any> {
    const result = await this.unitService.getUnits(parameters)
    return {
      code:1,
      message: '成功',
      result
    }
  }


  @Post()
  @ApiOperation({ summary: '添加单位' })
  async addUnit(@Body() parameters:AddOrUpdateUnitDto):Promise<BaseResponseResult<Unit>>{
    const result = await this.unitService.addUnit(parameters)
    return {
      code:1,
      message: '成功',
      result
    }
  }



  @Patch(":id")
  @ApiParam({ name:'id',description:"单位id" })
  @ApiOperation({ summary: '编辑更新单位信息' })
  async updateUnit(@Param("id") id:string,@Body() parameters:AddOrUpdateUnitDto):Promise<BaseResponseResult<Unit>>{
    const result = await this.unitService.updateUnit(id, parameters)
    return {
      code:1,
      message: '成功',
      result
    }
  }


  @Delete(":id")
  @ApiParam({ name:'id',description:"单位id" })
  @ApiOperation({ summary: '删除单位信息' })
  async delUnit(@Param("id") id:string):Promise<BaseResponseResult<Unit>>{
    const result = await this.unitService.delUnit(id)
    return {
      code:1,
      message: '成功',
      result
    }
  }
}
