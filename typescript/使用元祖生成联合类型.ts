/*
 * @Date: 2024-08-28 10:43:25
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-08-28 10:47:12
 * @Description: 
 */
const colors = ['♥', '♦', '♣', '♠'] as const
const values = [
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
] as const

type Colors = typeof colors[number]
type Values = typeof values[number]

const createCard = (color: Colors, value: Values) => {
    return color + value
}

createCard('♣', '2')