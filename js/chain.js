// function chainCall(name) {
//     var tasks = [];
//     tasks.push(() => {
//         console.log(`${name} modified`)
//     })
//     async function excuate() {
//         for(let idx in tasks) {
//             await tasks[idx]();
//         }
//     }
//     function doSomeThing() {
//         tasks.push(() => {
//             console.log(`${name} do something`)
//         })
//         return this;
//     }
//     function wait(num) {
//         tasks.push(() => {
//             console.log(`wainting ${num} seconds`)
//             return new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                     resolve()
//                 }, num * 1000)

//             })
//         })
//         return this;
//     }
//     function waitFirst(num) {
//         tasks.unshift(() => {
//             console.log('wainting first')
//             return new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                     resolve()
//                 }, num * 1000)
//             })
//         })
//         return this;
//     }

//     return {
//         excuate,
//         do: doSomeThing,
//         wait,
//         waitFirst
//     }
// }
class ChainCall {
    tasks = []
    constructor(name) {
        this.name = name
        this.tasks.push(() => {
            console.log(`${name} modified`)
        })
    }

    async excuate() {
        for(let idx in this.tasks) {
            await this.tasks[idx]();
        }
    }
     doSomeThing() {
        this.tasks.push(() => {
            console.log(`${this.name} do something`)
        })
        return this;
    }
     wait(num) {
        this.tasks.push(() => {
            console.log(`wainting ${num} seconds`)
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, num * 1000)

            })
        })
        return this;
    }
    waitFirst(num) {
        this.tasks.unshift(() => {
            console.log('wainting first')
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve()
                }, num * 1000)
            })
        })
        return this;
    }

}
const chainCall = new ChainCall('sxl')
// chainCall('sxl').excuate();
chainCall.excuate();


// chainCall('sxl').do('commit').excuate();
// chainCall.doSomeThing('commit').excuate();

// chainCall('sxl').wait(5).wait(1).do('commit').excuate();
chainCall.wait(5).wait(1).doSomeThing('commit').excuate();

// chainCall('sxl').waitFirst(5).do('commit').excuate();