/*
 * @Date: 2025-01-03 16:16:20
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2025-01-03 16:50:37
 * @Description: 
 */
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const jwtConstants = {
    secret: 'cms-screct',
  };