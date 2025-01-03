/*
 * @Date: 2025-01-03 10:21:58
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2025-01-03 11:52:37
 * @Description: 
 */
import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UtilityService } from "src/utils/utility.service";
@Controller('api')
export class UploadController {
    constructor(private readonly utilityService: UtilityService) {}
    // 上传图片
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: Express.Multer.File) {
        const fileName = await this.utilityService.compressImages(file);
        return {
            originImage: `${fileName}`,
            compressImage: `/images/${fileName}`
        }
    }
}

