import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from 'typeorm';
@Entity({
    name: 'project_user'
})
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty({ name: 'id', default: '124' })
    id: number

    @Column({ length: 255 })
    @ApiProperty({ name: 'username', default: '124' })
    username: string

    @Column({ length: 255 })
    @Exclude() // select: false 一样
    @ApiProperty({ name: 'password', default: '124' })
    @ApiHideProperty()
    password: string

    @CreateDateColumn()
    @ApiProperty({ name: 'createdAt', default: '2024年12月30日15:14:20' })
    createdAt: Date

    @ApiProperty({ name: 'contract', description: "联系方式" })
    @Expose()
    get contract() {
        return `联系方式: ${this.email}`
    }

    @UpdateDateColumn()
    @ApiProperty({ name: 'updatedAt', default: '2024年12月30日15:14:20' })
    updatedAt: Date

    @Column({ type: 'timestamp', nullable: true })
    @ApiProperty({ name: 'deletedAt', default: '2024年12月30日15:14:20' })
    deletedAt: Date

    @Column({ type: 'boolean', default: false, nullable: true })
    @ApiProperty({ name: 'isActive', default: false })
    isActive: boolean



    @Column({ nullable: true,  })// unique: true 当前表只能存在一个唯一值
    @ApiProperty({ name: 'email', default: '1234@qq.com' })
    email: string

    @Column({ type: 'enum', enum: ['admin', 'mannager', 'user', 'vistor'], default: "vistor" })
    @ApiProperty({ name: 'role', default: 'vistor' })
    role: string

    @Column({ type:'int', unsigned: true, default: 10 }) // 不能为负数
    @ApiProperty({ name: 'money', default:10 })
    @Transform(({ value }) => value ? value.toLocaleString('en-US') : value)
    money: number

}