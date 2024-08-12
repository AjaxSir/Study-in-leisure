// math.test.js

import { add, minus, multi, getData } from "./math";
import Counter from "./index";
test("测试加法 3 + 3", () => {
  expect(add(3, 3)).toBe(6);
});

test("测试减法 3 - 3", () => {
  expect(minus(3, 3)).toBe(0);
});

test("测试乘法 3 * 3", () => {
  expect(multi(3, 3)).toBe(9);
});
// toEqual 测试两个对象的原始值是否相等，只检查内容，不检查引用
const equalJson_1 = { success: true }
const equalJson_2 = { success: true }

test("测试对象相等", () => {
  expect(equalJson_1).toEqual(equalJson_2);
});

// toBeNull ��试对象是否为null
test('测试是否是null', ()=> {
    expect(null).toBeNull()
})

// toBeUndefined ��试对象是否为undefined

test('测试是否是undefined', ()=> {
    expect(undefined).toBeUndefined()
})

// toBeTruthy ��试对象是否为真值
test('测试是否是真值', ()=> {
    expect(true).toBeTruthy()
    expect(1).toBeTruthy()
    expect('true').toBeTruthy()
    expect({}).toBeTruthy()
})

// toBeFalsy ��试对象是否为假值

test('测试是否是假值', ()=> {
    expect(false).toBeFalsy()
    expect(0).toBeFalsy()
    expect('false').not.toBeFalsy()
    expect({}).not.toBeFalsy()
})

// toBeCloseTo 浮点数是否相等
test('测试浮点数是否相等', ()=> {
    expect(0.1 + 0.2).toBeCloseTo(0.3)
})

// toContain ��试对象是否包含某值

test('测试是否包含某值', ()=> {
    expect([1,2,3]).toContain(2)
})

// toMatch ��试对象是否匹配正则表达式

test('测试是否匹配正则表达式', ()=> {
    expect('test').toMatch(/t/)
})
0
//toThrow ��试函数是否抛出异常

test('测试是否抛出异常', ()=> {
    expect(() => {
        throw new Error('error')
    }).toThrow(new Error('error'))
})

// toHaveLength ��试对象是否有指定长度

test('测试是否有指定长度', ()=> {
    expect([1,2,3]).toHaveLength(3)
})

// toHaveProperty ��试对象是否有指定属性

test('测试是否有指定属性', ()=> {
    expect({ a: 1, b: 2, c: [] }).toHaveProperty('a', 1)
    expect({ a: 1, b: 2, c: [] }).toHaveProperty('b', 2)
    expect({ a: 1, b: 2, c: [] }).toHaveProperty('c')
})

// 异步校验
test('测试异步校验', async () => {
    // return getData().then(res => {
    //     expect(res.data).toEqual({ success: true })
    // }).catch(err => {
    //     expect.assertions(1)
    //     expect(err.toString()).toMatch('404')
    // })
    const { data } = await getData()
    expect(data).toEqual({ success: true })
})

let counter = null
beforeEach(() => {
    counter = new Counter()
})
test('测试 counter add', () => {
    counter.add(1)
    expect(counter.count).toBe(1)
})
test('测试 counter minus', () => {
    counter.minus(1)
    expect(counter.count).toBe(-1)
})