/*
 * @Date: 2024-12-11 15:27:32
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-17 10:04:16
 * @Description: 
 */
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, Generated, ManyToOne, JoinColumn } from 'typeorm'
import { List } from './list.entity'

@Entity()
export class Tags {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string

    // @Column()
    // @JoinColumn()
    @ManyToOne(() => List, (list) => list.tags)
    list: List
}
