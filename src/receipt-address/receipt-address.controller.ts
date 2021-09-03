import {
  Controller,
  UseGuards,
  Body,
  Get,
  Query,
  Post,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ReceiptAddressService } from './receipt-address.service';
import { AddReceiptAddress, GetReceiptAddressList, UpdateReceiptAddress } from './dto/receiptAddress.dto';
import { BaseResponseResult } from 'src/BaseResponseResult';
import { ReceiptAddress } from '@libs/db/models/receiptAddress.model';


@Controller('receiptAddress')
@ApiTags('后台会员收货地址')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ReceiptAddressController {
  constructor( private receiptAddressService: ReceiptAddressService) {};

  @Get()
  @ApiOperation({ summary: '获取会员地址列表' })
  async getUserReceiptAddressList(@Query() parameters: GetReceiptAddressList ): Promise<any> {
    const result = await this.receiptAddressService.getUserReceiptAddressList(parameters)
    return {
      code:1,
      message: '成功',
      result
    }
  }


  @Post()
  @ApiOperation({ summary: '添加会员地址' })
  async addReceiptAddress(@Body() parameters:AddReceiptAddress):Promise<BaseResponseResult<ReceiptAddress>>{
    const result = await this.receiptAddressService.addReceiptAddress(parameters)
    return {
      code:1,
      message: '成功',
      result
    }
  }

  
  @Patch(":id")
  @ApiParam({ name:'id',description:"地址id" })
  @ApiOperation({ summary: '编辑会员地址信息' })
  async updateReceiptAddress(@Param("id") id:string, @Body() parameters:UpdateReceiptAddress):Promise<BaseResponseResult<ReceiptAddress>>{
    const result = await this.receiptAddressService.updateReceiptAddress(id, parameters)
    return {
      code:1,
      message: '成功',
      result
    }
  }


  @Delete(":id")
  @ApiParam({ name:'id',description:"地址id" })
  @ApiOperation({ summary: '删除会员地址信息' })
  async delReceiptAddress(@Param("id") id:string):Promise<BaseResponseResult<ReceiptAddress>>{
    const result = await this.receiptAddressService.delReceiptAddress(id)
    return {
      code:1,
      message: '成功',
      result
    }
  }
}
