/*
 * @Date: 2025-01-02 10:39:36
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2025-01-02 17:57:11
 * @Description: 
 */
import { apply, applyTemplates, chain, mergeWith, move, Rule, SchematicContext, Tree, url } from '@angular-devkit/schematics';
import * as path from 'path';
import { strings} from '@angular-devkit/core'
import { plural } from 'pluralize'
import * as ts from 'typescript'
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function cmsGenerator(_options: any): Rule {
  console.log('options', _options)
  return (_tree: Tree, _context: SchematicContext) => {
    const { name, path:title } = _options
    /**
     * dasherize 转为短横线
     * camelize 驼峰命令法
     * classify 类命名法
     * capitalize 首字母大写
     * plural 英文单数转复数
     */
    const { dasherize, camelize, classify, capitalize } = strings
    // 定义模板规则 
    // apply 应用一些里的规则到文件书中 转换转后的文件数
    const sourceTemplateRules = apply(
      // 指定模板目录
      url('./files'),
      [
         // 将传入的选项传递给模板
        applyTemplates({
          name,
          title,
          dasherize, camelize, classify, capitalize,plural
        }),
        // 移动生成的文件到目标目录中
        move(path.normalize('src'))
      ]
    )
    // 应用规则并返回修改后的 Tree 与文件系统合并 可以串联多个规则
    return chain([
      // 将生成的文件与文件系统合并
      mergeWith(sourceTemplateRules),
      updateApiModule(name),
      updateSharedModule(name),
    ]);
  };
}
function updateSharedModule(name: string) {
  return (tree: Tree) => {
    const modulePath = 'src/shared/shared.module.ts'
    const sourceFile = getSourceFile(tree, modulePath)
    if (sourceFile) {
      const  { className } = getClassFieAndDasherizedName(name)
      const updates = [
        addImportToMudule(`${className}Service`, `./services/${name}.service`),
        addImportToMudule(className, `./entities/${className}`),
        addToModuleControllers('providers', `${className}Service`),
        addToModuleControllers('exports', `${className}Service`),
        addForFeature('forFeature', className)
      ]
      applyTransformationAndSave(tree, modulePath, sourceFile, updates)
    }

    return tree
  }
}
function addForFeature(arrayName: string, itemName: string): ts.TransformerFactory<ts.SourceFile> {
  return (_context:ts.TransformationContext) => (rootNode: ts.SourceFile) => {
    function vistor(node: ts.Node):ts.Node {
      if (ts.isCallExpression(node)
      && ts.isPropertyAccessExpression(node.expression)
      && node.expression.name.text === arrayName
      && node.arguments.length == 1
      && ts.isArrayLiteralExpression(node.arguments[0])) {
       const elements = [...node.arguments[0].elements, ts.factory.createIdentifier(itemName)]
       return ts.factory.updateCallExpression(
        node, node.expression,
        node.typeArguments,
        [ts.factory.createArrayLiteralExpression(elements)]
       )
      }
      return ts.visitEachChild(node, vistor, _context)
    }
    return ts.visitNode(rootNode, vistor) as ts.SourceFile
  }
  
}
function updateApiModule(name: string) {
  return (tree: Tree) => {
    const modulePath = 'src/api/api.module.ts'
    const sourceFile = getSourceFile(tree, modulePath)
    if (sourceFile) {
      const  { className, dasherizedName } = getClassFieAndDasherizedName(name)
      console.log(className, dasherizedName, 'className, dasherizedName')
      const updates = [
        addImportToMudule(`${className}Controller`, `./controllers/${dasherizedName}.controller`),
        addToModuleControllers('controllers', `${className}Controller`),
        
      ]
      applyTransformationAndSave(tree, modulePath, sourceFile, updates)
    }

    return tree
  }
}
function addToModuleControllers(arrayName: string, itemName: string): ts.TransformerFactory<ts.SourceFile> {
  return (_context:ts.TransformationContext) => (rootNode: ts.SourceFile) => {
    function vistor(node: ts.Node):ts.Node {
      if (ts.isPropertyAssignment(node)
      && ts.isIdentifier(node.name)
      && node.name.text == arrayName
      &&ts.isArrayLiteralExpression(node.initializer)) {
        const element = [...node.initializer.elements.map(e => e.getText()), itemName]
        return ts.factory.updatePropertyAssignment(node, node.name,
          ts.factory.createArrayLiteralExpression(element.map(e => ts.factory.createIdentifier(e))))
      }
      return ts.visitEachChild(node, vistor, _context)
    }
    return ts.visitNode(rootNode, vistor) as ts.SourceFile
  }
  
}
function applyTransformationAndSave(tree: Tree, modulePath: string, sourceFile:any, updates:any) {
  const updatedSourceFile = ts.transform(sourceFile, updates).transformed[0]
  tree.overwrite(modulePath, ts.createPrinter().printFile(updatedSourceFile))
}
function addImportToMudule(importName: string, modulePath: string):ts.TransformerFactory<ts.SourceFile> {
  return (_context: ts.TransformationContext) => (rootNode: ts.SourceFile) => {
    const lastImport = rootNode.statements.filter(ts.isImportDeclaration).pop()
    const newImport = ts.factory.createImportDeclaration(
          undefined,
          ts.factory.createImportClause(
            false, 
            undefined, 
            ts.factory.createNamedImports([
              ts.factory.createImportSpecifier(false, undefined, ts.factory.createIdentifier(importName))
            ])
          ),
          ts.factory.createStringLiteral(modulePath)
        )
        const updateStatements = ts.factory.createNodeArray([
          ...rootNode.statements.slice(0, rootNode.statements.indexOf(lastImport!) + 1),
          newImport,
          ...rootNode.statements.slice(rootNode.statements.indexOf(lastImport!) + 1)
        ])
        
        return ts.factory.updateSourceFile(rootNode, updateStatements) as ts.SourceFile
  }
}

function getClassFieAndDasherizedName(name:string) {
  const { classify, dasherize } = strings
  const className = classify(name)
  const dasherizedName = dasherize(name)
  return { className, dasherizedName }
}
function getSourceFile(tree: Tree, filePath: string): ts.SourceFile {
  const content = tree.read(filePath)?.toString('utf-8')
  return ts.createSourceFile(filePath, content!, ts.ScriptTarget.Latest, true)
}