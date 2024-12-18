import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { join, extname } from 'path'
@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../images'),
        filename: (_, file, cb) => {
          console.log(file, 'filessss')
          const filename = `${new Date().getTime()}-${extname(file.originalname)}`;
          cb(null, filename);
        }
      })
    })
  ]
})
export class UploadModule { }
