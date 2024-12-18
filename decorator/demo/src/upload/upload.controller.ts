/*
 * @Date: 2024-12-11 17:25:29
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-12 10:54:35
 * @Description: 
 */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, Res, Query } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { join  } from 'path'
import { zip } from 'compressing'
import { Response } from 'express'
@Controller({
  path: 'upload',
  version: '1'
})
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  uploadAlbum(@UploadedFile() file: any) {
    console.log(file, 'file')
    return {
      success: true,
      message: '上传成功1',
      data: {
        url: file.filename,
        originalname: file.originalname
      }
    }
  }

  @Post('albums')
  @UseInterceptors(FilesInterceptor('file'))
  uploadAlbums(@UploadedFiles() file: any) {
    console.log(file, 'file')
    return {
      success: true,
      message: '上传成功多张',
      data: {
        url: file.filename,
        originalname: file.originalname
      }
    }
  }

  @Get('export')
  downImage(@Query('url') url, @Res() res) { // 前端a标签下载
    console.log(url, 'url')
    const path = join(__dirname, `../images/${url}`)
    res.download(path)
  }

  @Get('stream')
  async downStreamImage(@Query('url') url, @Res() res:Response) {
    const path = join(__dirname, `../images/${url}`)
    const stream = new zip.Stream()
    await stream.addEntry(path)

    res.setHeader(
      'Content-Disposition',  
      `attachment; filename=avator`,
    )

    stream.pipe(res)
  }




}
