/*
 * @Date: 2024-12-16 17:13:09
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-17 15:09:15
 * @Description: 
 */
import axios from 'axios'

export const addList = (data: any) => {
    return axios.post('/v1/list', data).then(res => res.data)
}
export const getList = (data: any) => {
    return axios.post('/v1/list/all', { ...data  }).then(res => res.data)
}

export const update = (data: any) => {
    return axios.patch(`/v1/list/${data.id}`, data).then(res => res.data)
}

export const remove = (id: any) => {
    return axios.delete(`/v1/list/${id}`).then(res => res.data)
}

export const addTags = (data:any) => {
    return axios.post(`/v1/list/add/tags`, data).then(res => res.data)
}
export const transform = () => {
    return axios.post('/v1/list/transformCount', {
        fromId: 1,
        toId: 2,
        counts: 50000000
    }).then(res => {
        console.log(res)
        return  res.data
    })
}