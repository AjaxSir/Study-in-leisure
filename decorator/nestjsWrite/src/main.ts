/*
 * @Date: 2024-12-19 10:55:13
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-20 15:57:10
 * @Description: 
 */
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.moddlue'
import session from 'express-session'
async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.use(session({
        secret: 'secret key', // 用于对会话数据进行签名，确保数据在传输过程中不会被篡改。
        resave: false, // true：会话每次请求都会保存。 false：只有会话数据修改时才会保存。
        saveUninitialized: false, // true：会为每个新用户创建一个空的会话（无数据）。 false：只有当会话中有数据时才创建会话。
        /**
         * 
         * maxAge: 设置 cookie 的最大存活时间（以毫秒为单位）。
            场景: 用于定义用户登录的持续时间，例如 60000 表示会话 cookie 1 分钟后过期。
        
            secure: 是否仅通过 HTTPS 发送 cookie。
            场景: 在生产环境下设置为 true，确保 cookie 不会通过不安全的 HTTP 传输。
        
            httpOnly: 是否禁止客户端 JavaScript 访问 cookie。
            场景: 防止 XSS 攻击，建议始终开启。

            sameSite: 限制跨站点发送 cookie。
            值:
                "strict"：禁止跨站发送。
                "lax"：允许部分跨站请求发送（如从外部链接点击进入）。
                场景: 防御 CSRF 攻击。
         */
        cookie: {
            maxAge: 60000
        },
        /**
         * rolling
            作用: 是否在每次请求时重置会话的过期时间。
            值:
            true：每次请求都刷新 cookie 的有效期。
            false：只在会话数据修改时刷新。
         */
        /**
         * unset
            作用: 控制当会话销毁时，是否删除 session 对象。
            值:
            "destroy"：完全删除。
            "keep"：保留空的会话对象。
         */
        // store: new RedisStore({ client: redisClient }), 自定义会话存储方式。
    }))
    await app.listen(3000)
}

bootstrap();