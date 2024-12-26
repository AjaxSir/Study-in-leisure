/*
 * @Date: 2024-12-25 16:54:48
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-26 10:05:40
 * @Description: 
 */
import { AppDataSource } from './data-source'
import 'reflect-metadata'
import { User } from './entity/User'
import { Profile } from './entity/Profile'
import { Order } from './entity/Order'
import { Role } from './entity/Role'
import { Like, MoreThan } from 'typeorm'

import { Category } from './entity/Category'
AppDataSource.initialize().then(async () => {
//    const root = new Category()
//    root.name = 'root'

//    await AppDataSource.manager.save(root)

//    const child1 = new Category()
//    child1.name = 'child1'
//    child1.parent = root

//    await AppDataSource.manager.save(child1)

//    const child2 = new Category()
//    child2.name = 'child2'
//    child2.parent = root

//    await AppDataSource.manager.save(child2)

//    const grandson = new Category()
//    grandson.name = 'grandson1'
//    grandson.parent = child1

//    await AppDataSource.manager.save(grandson)

    const CategoryTree = AppDataSource.getTreeRepository(Category)

    

    const root = await CategoryTree.findRoots()
    console.log('根节点', root)

    const allTrees = await CategoryTree.findTrees()
    console.log('整棵树', allTrees)

    const childrenTree = await CategoryTree.findDescendantsTree(root[0])
    console.log('子节点树', childrenTree)

    const children = await CategoryTree.findDescendants(root[0]) // 平铺数据
    console.log('所有子节点包含孙子节点', children)

    // 通过某一个id查询节点 在查询该节点下的子节点
    const whichNode = await CategoryTree.findOneBy({
        id: 1
    })
    const findChildById = await CategoryTree.findDescendantsTree(whichNode)
    console.log('查询的节点', whichNode , 'findChildById', findChildById)


}).finally(() => process.exit(0))