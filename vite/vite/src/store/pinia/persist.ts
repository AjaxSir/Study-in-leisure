/*
 * @Date: 2024-08-28 09:53:11
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-08-28 10:00:38
 * @Description: 
 */
const KEY_VUEX = 'PINIA'
export default (context:any) => {
    console.log(context)
    const KEY = KEY_VUEX + '-' + context.store.$id
    window.addEventListener('beforeunload', () => {
        localStorage.setItem(KEY, JSON.stringify(context.store.$state))
    })

    try {
        const storage = JSON.parse(localStorage.getItem(KEY))
        console.log(storage, 'storage')
        if(storage) {
            context.store.$patch(storage)
        }
    }catch{
        console.log('存储数据有误')
    }

}