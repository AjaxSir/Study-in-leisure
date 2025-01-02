<!--
 * @Date: 2025-01-02 10:35:38
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2025-01-02 17:59:31
 * @Description: 
-->
### schematics
#### @angular-devkit/schematics-cli
- 帮助开发者自动划代码生成任务，创建组件服务模块
- 提供命令行 schematics 
> 生成一个cms-generator 的空白文件
- schematics blank --name=cms-generator 

- schematics .:{cms-generator} --name=role --path=admin --no-dry-run
> cms-generator是名字 在collection.json中的schematics下的名字
> 运行前先使用tsc 编译一下
> --name=role --path=admin 通过cmsGenerator(_options: any)中的options 获取

### 项目中使用
```sh
// 命令名称指的是 collection.json里面的cms-generator
nest g {命令名字} 参数1{name} 参数2{path}  --collection=D:/duyi/decorator/schematics/cms-generator
//  --no-dry-run 不用加参数
```
