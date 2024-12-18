const KEY_VUEX = 'VUEX'
export default (store) => {
    window.addEventListener('beforeunload', () => {
        localStorage.setItem(KEY_VUEX, JSON.stringify(store.state))
    })

    try {
        const storage = JSON.parse(localStorage.getItem(KEY_VUEX)!)
        console.log(storage, 'storage')
        if(storage) {
            store.replaceState(storage)
        }
    }catch{
        console.log('存储数据有误')
    }

}