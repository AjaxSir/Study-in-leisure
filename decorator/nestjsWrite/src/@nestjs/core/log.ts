/*
 * @Date: 2024-12-19 11:33:50
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-19 11:34:26
 * @Description: 
 */
import cls from 'cli-color'
export class Logger {
    static log (message: string, context: string = '') {
        // [Nest] 11924  - 2024/12/19 11:08:06     LOG [NestFactory] Starting Nest application...
        const pid = process.pid
        const timestamp = new Date().toLocaleString()
        console.log(`[Nest] ${cls.green(pid.toString())}  - ${cls.red(timestamp)}     LOG [${context}] ${cls.yellow(message)}`)
    }
}