
class Test {
    className: string;
    id: number;
    constructor(className:string, id:number) {
      this.className = className;
      this.id = id;
    }
  }
  const isSame = (op:any[],np:any[]):boolean => {
    if (op.length!== np.length) return false
    for(let i = 0; i < op.length; i++) {
      if(op[i]!== np[i]) return false
    }
    return true
  }
  const singleTon = <T extends new (...args:any[]) => any >(className: T) => {
    let ins: InstanceType<T> | null = null
    let params: any[] = []
    return new Proxy(className, {
      construct(target, argArray) {
        console.log('construct')
        if (!ins) {
            params = argArray
            ins = new target(...argArray)
        }
        if (!isSame(params, argArray)) {
            throw new Error('参数不一致')
        }
        return ins as Object
      },
    })
  }

  const TestClass = singleTon(Test);
  const test1 = new TestClass('sxl', 29);
  const test2 = new TestClass('syl', 4);
  console.log(test1 === test2)
  console.log(test2.className)
