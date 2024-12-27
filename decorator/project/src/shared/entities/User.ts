import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';
@Entity({
    name: 'project_user'
})
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

    @Column({ nullable: true,  })// unique: true 当前表只能存在一个唯一值
    email: string

    @Column({ type: 'enum', enum: ['admin', 'mannager', 'user', 'vistor'], default: "vistor" })
    role: string

    @Column({ type:'int', unsigned: true, default: 10 }) // 不能为负数
    money: number

}