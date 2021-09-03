/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-03 16:31:41
 * @LastEditTime: 2021-09-03 17:42:19
 * @Description: Modify here please
 */
/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-09-03 16:31:41
 * @LastEditTime: 2021-09-03 17:32:14
 * @Description: Modify here please
 */
import { ReceiptAddress } from '@libs/db/models/receiptAddress.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { AddReceiptAddress, GetReceiptAddressList, UpdateReceiptAddress } from './dto/receiptAddress.dto';

@Injectable()
export class ReceiptAddressService {
    constructor(@InjectModel(ReceiptAddress) private readonly receiptAddressModel: ReturnModelType<typeof ReceiptAddress>) { };


    // 获取会员地址列表
    async getUserReceiptAddressList(parameters: GetReceiptAddressList): Promise<Array<ReceiptAddress>> {
        const result = await this.receiptAddressModel
            .find({ userId: parameters.userId, name: { $regex: new RegExp(parameters.name, 'i') } })
            .limit(~~parameters.pageSize)
            .skip(~~((parameters.pageNumber - 1) * parameters.pageSize));
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }


    // 添加会员地址
    async addReceiptAddress(parameters: AddReceiptAddress): Promise<ReceiptAddress> {
        const result = await this.receiptAddressModel.create(parameters as any);
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }


    // 编辑会员地址
    async updateReceiptAddress(id: string, parameters: UpdateReceiptAddress): Promise<ReceiptAddress> {
        const result = await this.receiptAddressModel.findByIdAndUpdate(id, parameters as any)
        // 如果设置为默认地址，其他地址则为false;
        if (parameters.isDefaule) {
            // 会员地址列表
            const memberReceiptAddressList = await this.receiptAddressModel.find({ userId: result.userId })
            // 获取地址
            const filterAddress = memberReceiptAddressList.filter(item => item._id != result._id);
            // 把其他地址默认设置为false
            for (const key of filterAddress) {
                await this.receiptAddressModel.findByIdAndUpdate(key._id, { isDefaule: false })
            }
        }
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }


    // 删除会员地址
    async delReceiptAddress(id: string): Promise<ReceiptAddress> {
        const result = await this.receiptAddressModel.findByIdAndDelete(id)
        if (!result) {
            throw new HttpException('系统异常，请联系管理员', HttpStatus.OK);
        }
        return result;
    }

}
