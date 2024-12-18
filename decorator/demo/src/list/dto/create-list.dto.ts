/*
 * @Date: 2024-12-11 15:27:32
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-16 10:44:15
 * @Description: 
 */
import { IsString, IsBoolean, IsNumber, IsNotEmpty, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
export class CreateListDto {
    @IsString()
    @IsNotEmpty()
    @Length(10, 20, {
        message: "最小长度为10, 最大长度为20"
    })
    @ApiProperty({
        description: "标题",
        example: "TypeScript 入门"
    })
    title: string

    @IsNumber()
    
    id: number

    @ApiProperty({
        description: "是否为作者",
        example: true
    })
    @IsBoolean()
    IsAuthor: boolean
}
