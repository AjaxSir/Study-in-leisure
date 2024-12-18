
/*
 * @Date: 2024-12-11 15:27:32
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-16 10:48:45
 * @Description:  自定义管道验证dto
 */
import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ListPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const DTO =  plainToInstance(metadata.metatype, value)
    const errors = await validate(DTO)
    if (errors.length) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST)
    }
    return value;
  }
}