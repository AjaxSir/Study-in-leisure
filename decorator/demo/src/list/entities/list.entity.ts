/*
 * @Date: 2024-12-11 15:27:32
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-17 14:00:53
 * @Description: 
 */
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, Generated, OneToMany } from 'typeorm'

import { Tags } from './tags.entity'
@Entity()
export class List {
    @PrimaryGeneratedColumn()
    id: number
    @Column({
        comment:"注释",
    })
    name: string
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_at: Date
    @Column({ type: 'timestamp', nullable: true })
    update_at: Date
    @Column({ type: 'timestamp', nullable: true })
    delete_at: Date
    @Column({ type: 'varchar', length: 255 })
    description: string

    @Column({
        type: 'enum',
        enum: ['public', 'private'],
        default: 'public',
        comment: 'public or private'
    })
    statue: string

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    updateTime: Date

    @Column({
        default: true
    })
    is_deleted: boolean

    @Generated('uuid')
    uuid:string
    
    // @Column("simple-array")
    // names: string[];

    // @Column("simple-json")
    // profile: { name: string };
    // @Column()
    @OneToMany(() => Tags, (tag) => tag.list)
    tags: Tags[]


    @Column()
    count: number
}
