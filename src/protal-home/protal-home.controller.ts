/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2020-10-20 10:11:57
 * @LastEditTime: 2021-09-08 15:09:49
 * @Description: Modify here please
 */
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProtalHomeService } from './protal-home.service';

@Controller('protalHome')
@ApiTags('客户端首页相关')
export class ProtalHomeController {
  constructor(
    private protalHomeService: ProtalHomeService,
  ) { }

  @Get()
  @ApiOperation({ summary: '首页全部数据' })
  async getAllHomeData(): Promise<any> {
    // 获取5张banner图
    const banners = await this.protalHomeService.getBanners();
    // 获取导航列表
    const navigators = await this.protalHomeService.getNavigators();
    // 获取6条最新的商品信息
    const commodityList = await this.protalHomeService.getCommoditys();
    return {
      code: 1,
      message: '成功',
      result: {
        banners, navigators, commodityList
      }
    };
  }
}
