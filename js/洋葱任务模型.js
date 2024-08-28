/*
 * @Date: 2024-08-28 15:46:44
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-08-28 16:12:55
 * @Description: 
 */
class TaskPro {
    _list = []
    isRunning = false
    currentIdx = 0
    addTask (task) {
        this._list.push(task)
    }

    async run() {
        if (this.isRunning) return
        this.isRunning = true
        await this.runTask()
    }
    async runTask() {
        if (this.currentIdx >= this._list.length) {
            this.isRunning = false
            this._list = []
            this.currentIdx = 0
            return
        }
        
        const task = this._list[this.currentIdx]
        const i = this.currentIdx
        await task(this.next.bind(this))
        const j = this.currentIdx
        // 判断是否手动调用了 next 
        if (i === j) {
            await this.next()
        }
    }

    async next () {
        this.currentIdx++
        await this.runTask()
    }
}


const t = new TaskPro()
t.addTask(() => {
    console.log(0)
})
t.addTask(async (next) => {
    console.log(1, 'start')
    // await next()
    console.log(1, 'end')
})

t.addTask(() => {
    console.log(2)
})

t.addTask(() => {
    console.log(3)
})
t.addTask(() => {
    console.log(4)
})

t.run()