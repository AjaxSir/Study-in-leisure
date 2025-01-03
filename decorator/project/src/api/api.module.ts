/*
 * @Date: 2025-01-02 17:59:00
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2025-01-03 13:57:07
 * @Description: 
 */
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UploadController } from './controllers/upload.controller';
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static'
@Module({
  controllers: [UserController, UploadController],
  imports:[
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../images'),
      serveRoot: '/images'
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../images'),
        filename: (_, file, cb) => {
          const filename = `${new Date().getTime()}${extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req,file, callback) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
          callback(null, true);
        } else {
          callback(new Error('Only JPG and PNG format allowed!'), false);
        }
      },
      limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
      }
    })
  ]
})
export class ApiModule {}
