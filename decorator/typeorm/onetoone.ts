import { AppDataSource } from './data-source'
import 'reflect-metadata'
import { User } from './entity/User'
import { Profile } from './entity/Profile'
AppDataSource.initialize().then(async () => {
    const newUser = new User()
    newUser.username = 'onetoone2'
    newUser.password = 'onetoone2'
    newUser.email = 'onetoone2@qq.com'
    newUser.isActive = true


    const newProfile = new Profile()
    newProfile.bio = 'onetoone2 的资料'
    /**
     * 因为这里绑定了 所以保存应该是保存profile 
     * { cascade: true } 是绑定在profile上
     */
    newProfile.user = newUser 

    // await AppDataSource.manager.save(newUser)

    

    // await AppDataSource.manager.save(newProfile)

    await AppDataSource.manager.delete(User, {
        id: 16
    })


})