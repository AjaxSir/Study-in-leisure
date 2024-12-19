
const DefaultValue = (value: any) => {
    return (target: any, propertyKey: string) => {
        let val = value
        const setter = (newValue: any) => {
            val = newValue
        }

        const getter = () => {
            return val
        }

        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        })
    }
}

class Setting {
    @DefaultValue('defaultName')
    name: string;
    @DefaultValue(20)
    age: number
}

const s = new Setting()
s.age = 21
console.log(s.age)
console.log(s.name)
