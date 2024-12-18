/*
 * @Date: 2024-12-12 13:50:42
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-12 13:57:10
 * @Description: 
 */
import { Observable, interval,of, retry } from 'rxjs';
import { map } from 'rxjs/operators';
const ob = new Observable(sub => {
    sub.next(1)
    sub.next(2)
    sub.next(3)
    sub.next(4)
    setTimeout(() => {
        sub.next(5)
        sub.complete()
    })
});

// ob.subscribe(e => {
//     console.log(e)
// })
// interval(1000)
const sub = of(1,2,5,6,7,9).pipe().subscribe(e => {
    console.log(e)
    if(e === 4) {
        sub.unsubscribe()
    }
})