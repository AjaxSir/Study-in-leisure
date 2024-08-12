"use strict";
class Animal {
    constructor(name) {
        this.name = name;
    }
}
class AnimalT {
    constructor(name) {
        this.name = name;
    }
}
class AnimalI {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    say() {
        return `I am ${this.name}, I am ${this.age} years old.`;
    }
}
class AnimalI_ extends AnimalI {
    constructor(name, age) {
        super(name, age);
    }
    say() {
        return `I am ${this.name}, I am ${this.age} years old.`;
    }
}
let a = new Animal("Lion");
let c = new AnimalT(32);
let i = new AnimalI('sxl', 24);
console.log(i.say());
console.log(c.name); // Output: 32
