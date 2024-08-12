import { track,  trigger} from './effect.js'
export function reactivr(obj) {
    return new Proxy(obj, {
        get(target, key) {
            track(target, key)
            return Reflect.get(target, key)
        },
         set(target, key, val) {
            trigger(target, key, val)
            return Reflect.set(target, key, val)
         }
    })
}