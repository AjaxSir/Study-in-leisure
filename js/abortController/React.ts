/*
 * @Date: 2024-11-04 15:58:45
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-11-04 16:01:14
 * @Description: 
 */
useEffect(() => {
    const controller = new AbortController()
    window.addEventListener('resize', () => {}, {
        signal: controller.signal
    })
    window.addEventListener('scroll', () => {}, {
        signal: controller.signal
    })
    return () => {
        controller.abort()
    }   
})