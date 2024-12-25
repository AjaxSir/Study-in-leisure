import { AppDataSource } from './data-source'
import 'reflect-metadata'
import { User } from './entity/User'
import { Profile } from './entity/Profile'
import { Order } from './entity/Order'
import { Like, MoreThan } from 'typeorm'
AppDataSource.initialize().then(async () => {
    // const newUser = new User()
    // newUser.username = 'onetomany2'
    // newUser.password = 'onetomany2'
    // newUser.email = 'onetomany2@qq.com'
    // newUser.isActive = true


    // const order1 = new Order()
    // order1.amount = 1
    // order1.productName = 'iphone12'
    // order1.price = 10000
    // // order1.user = newUser

    // const order2 = new Order()
    // order2.amount = 1
    // order2.productName = 'iphone12'
    // order2.price = 10000
    // // order2.user = newUser

    // newUser.orders = [order1, order2]

    // await AppDataSource.manager.save(newUser)
    // console.log('add successfully added')

    // 查找 userid 所对应的商品
    const result = await AppDataSource.manager.find(Order, {
        where: {
            user: { id: 21 }
        },
        skip: 0,
        take: 1,
        order: {
            id: 'DESC'
        }
    })
    const result2 = await AppDataSource.manager.findBy(Order, {
        user: { id: 21 }
    })
    const name = 'onet'
    const result3 = await AppDataSource.manager.findBy(User, {
        username: Like(`%${name}%`)
    })

    // 查找至少买过一个商品的用户
    const result4 = await AppDataSource.manager.findBy(User, {
        orders:{
            amount: MoreThan(0)
        }
    })


    console.log('result========', result, '\n')
    console.log('result2========', result2, '\n')
    console.log('result3========', result3, '\n')
    console.log('result4========', result4, '\n')

}).finally(() => process.exit(0))