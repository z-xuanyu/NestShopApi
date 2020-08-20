import {
  Controller,
  UseGuards,
  Put,
  Body,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
} from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ReceiptAddress } from '@libs/db/models/receiptAddress.model';
import { Crud } from 'nestjs-mongoose-crud';
import { AuthGuard } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { async } from 'rxjs/internal/scheduler/async';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class setDefaultDto {
  @ApiProperty({ title: '用户id' })
  userID: string;
  @ApiProperty({ title: '地址id' })
  addressID: string;
  @ApiProperty({ title: '是否默认' })
  isDefaule: boolean;
}

class MemberAddressDto {
  @ApiProperty({ title: '会员ID' })
  userID: string;
}
@Crud({
  model: ReceiptAddress,
  routes: {
    create: {
      decorators: [ApiOperation({ summary: '添加收货地址' })],
    },
    find: {
      decorators: [ApiOperation({ summary: '全部会员收货地址列表' })],
    },
    findOne: {
      decorators: [ApiOperation({ summary: '收货地址详细信息' })],
    },
    update: {
      decorators: [ApiOperation({ summary: '更新收货地址信息' })],
    },
    delete: {
      decorators: [ApiOperation({ summary: '删除收货地址' })],
    },
  },
})
@Controller('receiptAddress')
@ApiTags('后台会员收货地址')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ReceiptAddressController {
  constructor(
    @InjectModel(ReceiptAddress) private readonly model,
    @InjectModel(ReceiptAddress)
    private readonly receiptAddressModel: ReturnModelType<
      typeof ReceiptAddress
    >,
  ) {}

  // 设置为默认收货地址
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Put('setDefault')
  @ApiOperation({ summary: '设置为默认地址' })
  async setDefaultAddress(@Body() setDefaultDto: setDefaultDto) {
    const { userID, isDefaule, addressID } = setDefaultDto;
    await this.receiptAddressModel.findByIdAndUpdate(
      { _id: addressID },
      { isDefaule: isDefaule },
    );
    const addressArr = await this.receiptAddressModel.find({ userID });
    const otherAddress = addressArr.filter(
      (item) => String(item._id) !== String(addressID),
    );
    otherAddress.forEach(async (item) => {
      await this.receiptAddressModel.findByIdAndUpdate(
        { _id: item._id },
        { isDefaule: !isDefaule },
      );
    });
    return {
      code: 20000,
      message: 'ok',
      data: await this.receiptAddressModel.find({}),
    };
  }

  @Get('list')
  @ApiOperation({ summary: '会员收货地址列表' })
  async getMemberAddressList(@Query() MemberAddressDto: MemberAddressDto) {
    const { userID } = MemberAddressDto;
    const res = await this.receiptAddressModel.find({ userID: userID });
    return {
      code: 20000,
      data: res,
      message: 'ok',
    };
  }
}
