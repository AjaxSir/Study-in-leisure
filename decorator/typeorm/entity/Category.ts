import { Column, Entity, Tree, TreeChildren, TreeParent, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@Tree('materialized-path')
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @TreeChildren()
    subcategories: Category[]

    @TreeParent()
    parent: Category | null
}