/*
 * @Date: 2024-05-28 15:22:16
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-05-29 10:24:20
 * @Description: 
 */
/*
 * @Date: 2024-05-28 15:22:16
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-05-28 17:50:04
 * @Description: 
 */
import app from './app'
import { PORT } from './app/app.config'

app.listen(PORT, () => {
    console.log('🚀 服务已启动!')
})

