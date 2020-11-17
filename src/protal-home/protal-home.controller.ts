import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { Banner } from '@libs/db/models/banner.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { Category } from '@libs/db/models/category.model';
import { Commodity } from '@libs/db/models/commodity.model';
import {
  commoditySearchKeywordDto,
  categoryCommodityDto,
  commodityInfoDto,
} from './dto/protal.home.dto';

@Controller('protal-home')
@ApiTags('客户端首页')
export class ProtalHomeController {
  constructor(
    @InjectModel(Banner)
    private readonly bannerModel: ReturnModelType<typeof Banner>,
    @InjectModel(Category)
    private readonly categoryModel: ReturnModelType<typeof Category>,
    @InjectModel(Commodity)
    private readonly commodityModel: ReturnModelType<typeof Commodity>,
  ) { }

  @Get()
  @ApiOperation({ summary: '首页全部数据' })
  async getAllHomeData(): Promise<any> {
    try {
      // 获取5张banner图
      const bannerList = await this.bannerModel.find().limit(5);
      // 获取全部分类
      const categoryList = await this.categoryModel.find();
      //  获取推荐商品
      const hotCommodityList = await this.commodityModel.find({
        isRecommend: 1,
      });

      // 获取6条最新的商品信息
      const commodityList = await this.commodityModel.find().limit(6);

      return { bannerList, categoryList, hotCommodityList, commodityList };
    } catch (err) {
      return { code: 0, msg: err };
    }
  }

  @Get('SearchCommodity')
  @ApiOperation({ summary: '搜索商品' })
  async searchCommodity(@Query() searchKeyword: commoditySearchKeywordDto): Promise<any> {
    const { name, pageSize, pageNo } = searchKeyword;
    const totalCountData = await this.commodityModel.find(); //总条数
    // 名称查询
    if (name) {
      const data = await this.commodityModel
        .find({ name: { $regex: name } })
        .populate('receiptAddress')
        .limit(Number(pageSize || 10))
        .skip(Number((pageNo - 1) * pageSize))
        .exec();
      return {
        pageNo: pageNo,
        pageSize: pageSize,
        data: data,
        totalCount: totalCountData.length,
        totalPage:
          totalCountData.length / pageSize < 1
            ? 1
            : totalCountData.length / pageSize,
      };
    } else {
      const data = await this.commodityModel
        .find()
        .populate('receiptAddress')
        .limit(Number(pageSize || 10))
        .skip(Number((pageNo - 1) * pageSize))
        .exec();
      return {
        pageNo: pageNo,
        pageSize: pageSize,
        data: data,
        totalCount: totalCountData.length,
        totalPage:
          totalCountData.length / pageSize < 1
            ? 1
            : totalCountData.length / pageSize,
      };
    }
  }

  @Get('categoryCommodity')
  @ApiOperation({ summary: '分类商品' })
  async categoryCommodity(@Query() categoryCommodity: categoryCommodityDto): Promise<any> {
    const { categoryID, pageSize, pageNo } = categoryCommodity;

    try {
      const totalCountData = await this.commodityModel.find({
        categories: categoryID,
      });
      const categoryCommodityList = await this.commodityModel
        .find({
          categories: categoryID,
        })
        .limit(Number(pageSize || 10))
        .skip(Number((pageNo - 1) * pageSize))
        .exec();
      return {
        pageNo: pageNo,
        pageSize: pageSize,
        data: categoryCommodityList,
        totalCount: totalCountData.length,
        totalPage:
          totalCountData.length / pageSize < 1
            ? 1
            : totalCountData.length / pageSize,
      };
    } catch (err) {
      return { code: 0, msg: err };
    }
  }

  @Get('getCommodityInfo')
  @ApiOperation({ summary: '获取商品详细信息' })
  async getCommodityInfo(@Query() commodityInfo: commodityInfoDto): Promise<any> {
    const { commodityID } = commodityInfo;
    try {
      const commodityInfo = await this.commodityModel.findById(commodityID);
      return commodityInfo;
    } catch (err) {
      return { code: 0, msg: err };
    }
  }
}
