/*
 * @Date: 2024-12-25 09:56:53
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-25 10:24:13
 * @Description: 
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 255 })
    username: string

    @Column({ length: 255, select: false })
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date

    @Column({ type: 'boolean', default: false, nullable: true })
    isActive: boolean

    @Column({ nullable: true, unique: true })// 当前表只能存在一个唯一值
    email: string

    @Column({ type: 'enum', enum: ['admin', 'mannager', 'user', 'vistor'], default: "vistor" })
    role: string

    @Column({ type:'int', unsigned: true }) // 不能为负数
    money: number
}
