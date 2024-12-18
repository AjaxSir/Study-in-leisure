/*
 * @Date: 2024-12-10 17:00:01
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-10 17:07:56
 * @Description: 
 */
import axios from 'axios'
const Get = (url: string) => {
    return (target:any,key: string,_des:any) => {
        const fnc = target[key]
        axios.get(url).then(res => {
            fnc({
                data: res.data,
                success: true
            })
        }).catch(e => {
            fnc({
                success: false,
                message: e.message
            })
        })
    }
}

class Controller {
    @Get('https://api.wmdb.tv/api/v1/top?type=Imdb&skip=0&limit=20&lang=Cn')
    getList(result: any) {
        console.log(result)
    }
}