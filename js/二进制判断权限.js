const READ  =  0b000001
const WRITE =  0b000010
const DELETE = 0b000100
const SHARE =  0b001000
const CREATE = 0b010000

const perm = READ | WRITE | DELETE

console.log(perm) // 0b000111

const removeRead = perm & ~READ // ~READ 的作用是 取反 0b111110 然后与  0b000111 取且为 0b111110

console.log((perm & READ) === READ )

console.log((removeRead & READ) === READ )