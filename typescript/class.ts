class Animal {
    name: string;
    constructor(name:string) {
        this.name = name;
    }
}

class AnimalT<T> {
    name: T;
    constructor(name: T) {
        this.name = name;
    }
}

interface User<T> {
    name:T
    age: number
    say: () => string
}

class AnimalI implements User<string> {
    name:string;
    age:number
    constructor( name: string, age: number ) {
        this.name = name;
        this.age = age;
    }
    say(): string{
        return `I am ${this.name}, I am ${this.age} years old.`
    }
}
class AnimalI_  extends AnimalI {
    constructor( name: string, age: number ) {
        super(name, age)
    }
    say(): string{
        return `I am ${this.name}, I am ${this.age} years old.`
    }
}



let a = new Animal("Lion");
let c = new AnimalT(32);
let i = new AnimalI('sxl', 24);



console.log(i.say())
console.log(c.name); // Output: 32