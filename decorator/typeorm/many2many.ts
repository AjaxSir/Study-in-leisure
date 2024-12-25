/*
 * @Date: 2024-12-25 16:54:48
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-25 17:17:41
 * @Description: 
 */
import { AppDataSource } from './data-source'
import 'reflect-metadata'
import { User } from './entity/User'
import { Profile } from './entity/Profile'
import { Order } from './entity/Order'
import { Role } from './entity/Role'
import { Like, MoreThan } from 'typeorm'
AppDataSource.initialize().then(async () => {
    // const user = new User()
    // user.username = '周三'
    // user.password = '123456'
    // user.email = 'role@qq.com'

    // const role1 = new Role()
    // role1.name = 'admin'
    // const role2 = new Role()
    // role2.name = 'user'

    // user.roles = [role1, role2]

    // await AppDataSource.manager.save(user)
    // console.log('add user successfully')

    // 查看某一个
    // const findOneUser = await AppDataSource.manager.findOne(User, {
    //     relations: ['roles'],
    //     where: { id: 1 }
    // })
    
    // const findOneUser2 = await AppDataSource.manager.find(User, {
    //     relations: ['roles']
    // })
    // console.log('findOneUser:', findOneUser, '\n')
    // console.log('findOneUser2:', findOneUser2)
    

    const findUsersWithAdminRole = await AppDataSource.getRepository(User)
    .createQueryBuilder("user")
    .innerJoinAndSelect("user.roles", "role")  // 联结 roles 表
    .where("role.name = :roleName", { roleName: 'admin' })  // 查询角色名为 'admin' 的用户
    .getMany();  // 获取多个用户

    console.log('findUsersWithAdminRole', findUsersWithAdminRole ,'\n');


    const allUsers = await AppDataSource.manager.find(User, {
        relations: ['roles'],  // 加载 roles 关联
    });
    
    const usersWithAdminRole = allUsers.filter(user => 
        user.roles.some(role => role.name === 'admin')
    );
    
    console.log('usersWithAdminRole', usersWithAdminRole ,'\n'); // roles里面包含了所有应含的权限 另外两个查询则是过滤掉了

    const findUsersWithAdminOrManagerRole = await AppDataSource.getRepository(User)
    .createQueryBuilder("user")
    .innerJoinAndSelect("user.roles", "role")
    .where("role.name IN (:...roleNames)", { roleNames: ['admin', 'manager'] })  // 查询角色为 'admin' 或 'manager' 的用户
    .getMany();

    console.log('findUsersWithAdminOrManagerRole', findUsersWithAdminOrManagerRole ,'\n');
}).finally(() => process.exit(0))