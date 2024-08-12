<!--
 * @Date: 2024-07-09 14:44:36
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-07-09 16:12:05
 * @Description:
-->

## react 面试题

### 为什么 react 组件之前要写 import React from 'react'

@babel/preset-react 编译时有两个模式

- runtime: classical

```js
const App = () => {
	return;
	React.createElement(
		'div',
		null,
		React.createElement('h5', null, 'this is a title'),
		React.createElement('h4', null, 'this is content')
	);
};
// 需要去找React 调用React中的createElement函数
```

- runtime: automatic

```js
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
const App = () => {
	return _jsxs('div', {
		children: [
			_jsx('h5', {
				children: 'this is a title',
			}),
			_jsx('h4', {
				children: 'this is content',
			}),
		],
	});
};
```

### 什么是 fiber

- fiber 是 react 16.8.0 引入的一个数据结构， 本质 是为了 是之前的 stack reconciler(堆栈协调) 变成 fiber reconciler
- 数据结构

  ```js
    const filerNode = {
        tag, // 什么类型的fiber
        key, //
        type, // dom的元素节点

        // 构建复杂的链表节点
        return, // 父节点
        child, // 子节点
        subling, // 兄弟节点

        // 副作用链
        effectTag,
        nextEffect,
        firstEffect,
        lastEffect,
    }
  ```

### 说说 stact reconciler 和 fiber reconciler

- dom 节点本质就是一棵树 遍历时一定会 递归
- fiber 通过 return child subling 之间的关系构成不递归的遍历

### react 有几种数据结构 分别是干嘛的

- 四种
  - v-dom / element : 函数组件执行的返回值 React.createElement 类组件的 render 函数的返回值
    - 本质上是一个 JSON 对象
  - current fiber
    - 当前 react 内存中,表示当前数据状态的核心数据结构
  - workInProgress fiber
    - 状态更新时 生成的，在我的 react 完成调和 commitWork 更新之后 会切换成 current fiber
  - 真实 dom
    总结：react 调和的过程中，就是 current fiber 和 v-dom 对比，生成子组件的的 workInProgress fiber 的过程

### react 更新流程

#### begin work

- 使用 V-dom 和 current fiber 对比生成子节点的 workInProgress fiber 的过程
  - 期间执行函数组件、类组件、diff、子节点
    - 需要变更的节点打上 EffectTag (增，删，改， 增和改)

#### complete work

- 往上更新
- 把所有具有 effectTag 的元素，串联成一个 effectList
- 构建真实的 DOM,但不更新页面

#### commit work

- 处理 effectList
- 更新页面
- workInProgress fiber 切换到 current fiber
- 执行 useLayoutEffect

### 什么是闭包陷阱

- useState 的闭包

```js
const [num, setNum] = useState(0);

const handleClick = () => {
	setTimeout(() => {
		setNum(num + 1); // 在1s内点击多少次都会只加1
		// 与
		setNum((num) => num + 1);
	}, 1000);
};
```
- useEffect 的闭包
```js
  const [num, setNum] = useState(0);
  useEffect(() => {
  	setInterval(() => {
  		console.log(num); // 一直是 0
  	}, 1000);
  }, []);
  const handleClick = () => {
  	// 点击之后 useEffect 打印会一直是0
  	setNum((num) => num + 1);
  };
```
- 解决方案
```javascript
    const [num, setNum] = useState(0);
    const numRef = useRef(0)
  useEffect(() => {
  	setInterval(() => {
  		console.log(numRef.current);
  	}, 1000);
  }, []);
  const handleClick = () => {
    numRef.current = num + 1
  	setNum((num) => num + 1);
  };
```

