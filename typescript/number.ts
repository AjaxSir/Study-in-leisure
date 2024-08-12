let arr: number[] = [1,2,3,4]

let arrT: Array<number> = [1,2,3,4] // 数组泛型


interface IArr {
    [index:number]: number
}

let iarr:IArr = [1,2,3,4]