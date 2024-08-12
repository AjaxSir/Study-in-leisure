/*
 * @Date: 2024-05-29 10:31:17
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-05-29 11:27:29
 * @Description: 
 */
import express from 'express';
import * as PostController from './posts.controller'
import { printfRequestUrl } from '../app/app.middleware'
const router = express.Router()

router.get('/posts', printfRequestUrl, PostController.index)

export default router;