import { AppDataSource } from './data-source'
import 'reflect-metadata'
import { User } from './entity/User'
import { MoreThan, LessThan, MoreThanOrEqual, LessThanOrEqual, Equal, Not } from 'typeorm'
// const user = [
//     {
//         username: '周三',
//         password: '123456',
//         email: '123456@qq.com',
//         roles: ['admin'],
//         money: 100
//     },
//     {
//         username: '周三2',
//         password: '123456',
//         email: '123456@qq.com',
//         roles: ['admin'],
//         money: 100
//     }
// ]
AppDataSource.initialize().then(async () => {

    // console.log('Database connection has been established successfully.');
    // // 保存一个用户 
    // const user = new User()
    // user.username = '周三'
    // user.password = '123456'
    // // user.email = '1234567@qq.com'
    // user.role = 'admin'
    // user.money = 100

    // await AppDataSource.manager.save(user)
    // console.log('add user successfully')

    // // 查询一个用户

    // const findOneUser = await AppDataSource.manager.findOne(User, {
    //     where: { id: user.id }
    // })

    // console.log('已经找到了用户:', findOneUser)

    // if (findOneUser) {
    //     findOneUser.role = 'vistor'
    //     await AppDataSource.manager.save(findOneUser)
    //     console.log('用户已经更新:', findOneUser)
    // }

    // if (findOneUser) {
    //     await AppDataSource.manager.remove(findOneUser)
    //     console.log('用户已经删除:', findOneUser)
    // }

    /// 批量操作==========================================================================
    const _user = [
        {
            username: '周三',
            password: '123456',
            email: '12345678@qq.com',
            roles: ['admin'],
            money: 100
        },
        {
            username: '周三2',
            password: '123456',
            email: '1234567@qq.com',
            roles: ['admin'],
            money: 100
        }
    ]

    // await AppDataSource.manager.insert(User, _user)
    // console.log('批量插入 successfully added')

    // 查询并计数
    const [allUsers, total] = await AppDataSource.manager.findAndCount(User)
    console.log('allUsers', allUsers)
    console.log('total', total)

    const count = await AppDataSource.manager.countBy(User, { email: '1234567@qq.com'})

    console.log('找到邮箱是1234567@qq.com的数量为', count, '个')

    // 查询单个用户
    const findOneUser1 = await AppDataSource.manager.findOne(User, {
        where: { email: '1234567@qq.com' }
    })
    
    const findOneUser2 = await AppDataSource.manager.findOneBy(User, { email: '1234567@qq.com' })
    console.log('查询单个用户', findOneUser1, findOneUser2)


    // 查询多个用户
    const manyUser = await AppDataSource.manager.find(User, { where: {
        id: MoreThan(1)
    } })
    console.log('id大于1的用户', manyUser)

    // 删除多个用户
    await AppDataSource.manager.delete(User, { id: MoreThan(2) })
        console.log('删除id大于2的用户')

    try {
        // findOne 找不到则返回 null findOneOrFail则抛出错误
        const findOneUser3 = await AppDataSource.manager.findOneOrFail(User, {
            where: { email: '1@qq.com' }
        })
        const findOneUser4 = await AppDataSource.manager.findOneByOrFail(User, { email: '1@qq.com' })
        console.log('findOneOrFail 找到用户', findOneUser3, findOneUser4)
    } catch (error) {
        console.log('未找到用户')
    }

})