/*
 * @Date: 2024-07-04 16:25:08
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-07-04 17:43:18
 * @Description:
 */
const fs = require('fs');
const parse = require('@babel/parser').parse; // 读取依赖文件内容
const traverse = require('@babel/traverse').default; // 遍历 import 节点
const path = require('path');
const babel = require('@babel/core'); // 将代码转化为es5
const moduleAnalysis = (filename) => {
	const content = fs.readFileSync(filename, 'utf8');

	const ast = parse(content, {
		sourceType: 'module',
	}); // 获取 ast 树

	const devDependencies = {};

	// 遍历import节点获取导入的文件
	traverse(ast, {
		ImportDeclaration({ node }) {
			const dirname = path.dirname(filename);
			const newFile = `./${path.join(dirname, node.source.value)}.js`.replace(
				/\\/g,
				'/'
			);
			devDependencies[node.source.value] = newFile;
		},
	});

	const { code } = babel.transformFromAstSync(ast, null, {
		presets: ['@babel/preset-env'],
	});
	return { filename, devDependencies, code };
};

const makeDependenciedGraph = (entery) => {
	const enteryModule = moduleAnalysis(entery);
	const graphArray = [enteryModule];
	for (let i = 0; i < graphArray.length; i++) {
		const { devDependencies } = graphArray[i];
		for (let key in devDependencies) {
			const newModule = moduleAnalysis(devDependencies[key]);
			graphArray.push(newModule);
		}
	}
	const graph = {};
	for (let i = 0; i < graphArray.length; i++) {
		const { filename } = graphArray[i];
		graph[filename] = graphArray[i];
	}
	return graph;
};

const generateCode = (entry) => {
	const graph = makeDependenciedGraph(entry);
	return ` (function(graph){
        function require(module) {
            function localRequire(relativePath) {
                return require(graph[module].dependencies[relativePath]);
            };
            var exports = {};
            (function(require, exports, code) {
                eval(code);
            })(localRequire, exports, graph[module].code);
            return exports;
        };
        require('${entry}');
    })(${JSON.stringify(graph)});`;
};

const code = generateCode('./src/index.js');
console.log('code:\n' + code + '\n end');
