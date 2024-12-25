/*
 * @Date: 2024-12-25 14:10:30
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-25 14:47:02
 * @Description: 
 */
import { Entity, 
   PrimaryGeneratedColumn, 
   Column, 
   CreateDateColumn, 
   UpdateDateColumn,
   OneToOne,
   JoinColumn
 } from 'typeorm';
import { User } from './User'
@Entity()
 export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    bio: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
   
    
    // cascade: true 当保存更新删除自动应用到相关实体上 针对当前实体 而
    // onDelete: 'CASCADE', onUpdate: 'CASCADE' 是针对user被删除时
    // RESTRICT 试图删除主体/user时 检查外键情况 避免误删
    // SET NULL 删除用户时 将个人资料的用户ID设置为null
   //  @OneToOne(() => User, user => user.profile, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
   //  @JoinColumn()
   //  user: User;
 }