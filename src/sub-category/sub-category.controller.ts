/**
 *                    _ooOoo_
 *                   o8888888o
 *                   88" . "88
 *                   (| -_- |)
 *                    O\ = /O
 *                ____/`---'\____
 *              .   ' \\| |// `.
 *               / \\||| : |||// \
 *             / _||||| -:- |||||- \
 *               | | \\\ - /// | |
 *             | \_| ''\---/'' | |
 *              \ .-\__ `-` ___/-. /
 *           ___`. .' /--.--\ `. . __
 *        ."" '< `.___\_<|>_/___.' >'"".
 *       | | : `- \`.;`\ _ /`;.`/ - ` : | |
 *         \ \ `-. \_ __\ /__ _/ .-` / /
 * ======`-.____`-.___\_____/___.-`____.-'======
 *                    `=---='
 *
 * .............................................
 * @ xuanyu         佛祖保佑             永无BUG
 */
import { Category } from '@libs/db/models/category.model';
import { SubCategory } from '@libs/db/models/subCategory.model';
import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { craeteSubCategoryDto } from "../Dto/sub-category/createSubCategoryDto"
import { DeleteSubCategoryDto } from "../Dto/sub-category/deleteSubCategoryDto"
import { UpdateSubCategoryDto } from "../Dto/sub-category/updateSubCategoryDto"

@Controller('subCategory')
@ApiTags("后台二级分类")
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class SubCategoryController {

    // 注入父级分类，二级分类模型
    constructor(@InjectModel(SubCategory) private readonly subCategoryModel: ReturnModelType<typeof SubCategory>, @InjectModel(Category) private readonly categoryModel: ReturnModelType<typeof Category>) { }

    @Post("add")
    @ApiOperation({ summary: '添加二级分类' })
    async createSubCategory(@Body() craeteSubCategor: craeteSubCategoryDto): Promise<SubCategory> {
        // 创建二级分类
        const result = await this.subCategoryModel.create(craeteSubCategor)
        // 关联父级分类
        try {
            await this.categoryModel.updateOne({ _id: result.parentID }, { $push: { children: result._id } })
        } catch (err) {
            console.log(err)
        }
        return result
    }

    @Delete("delete")
    @ApiOperation({ summary: "删除二级分类" })
    async deleteSubCategory(@Body() subCategoryID: DeleteSubCategoryDto): Promise<any> {
        await this.subCategoryModel.deleteOne({ _id: subCategoryID.subCatagoryID })
        return {
            code: 1,
            message: "成功",
            data: null
        }
    }

    @Put("update")
    @ApiOperation({ summary: "编辑二级分类" })
    async updateSubCategory(@Body() subCategory: UpdateSubCategoryDto): Promise<any> {

        await this.subCategoryModel.findByIdAndUpdate(subCategory._id, subCategory)
        return {
            code: 1,
            message: "成功",
            data: null
        }
    }
}
