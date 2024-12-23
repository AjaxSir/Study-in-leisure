/*
 * @Date: 2024-12-23 16:13:41
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-23 16:31:07
 * @Description: 
 */
/**
 *  简单next中间件理解
 */
class _Request {
    url
    constructor(url: string) {
        this.url = url
    }
}


class _Response {
    send(data: any) {
        console.log('response data:', data)
    }
}

class _Express {
    middleware

    constructor() {
        this.middleware = []
    }

    use (middleWare) {
        this.middleware.push(middleWare)
    }

    handleMiddleware(req, res) {
        let index = 0
        const _this = this
        function next() {
            if (index < _this.middleware.length) {
                const middleware = _this.middleware[index++]
                middleware(req, res, next)
            }
        }
        next()
    }

}

const app = new _Express()
const req = new _Request('request')
const res = new _Response()
app.use((req, res, next) => {
    console.log('request- 1', req.url)
    next()
})

app.use((req, res, next) => {
    console.log('request- 2', req.url)
    // next()
})

app.use((req, res, next) => {
    console.log('request- 3', req.url)
    res.send('hello')
})

app.handleMiddleware(req, res)