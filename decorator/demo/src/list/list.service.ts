/*
 * @Date: 2024-12-11 15:27:32
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-18 10:31:31
 * @Description: 
 */
import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { Status } from './enum'
import { Repository, Like } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { List } from './entities/list.entity'
import { Tags } from './entities/tags.entity'
import { REQUEST } from '@nestjs/core';
@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private readonly list: Repository<List>,
    @InjectRepository(Tags) private readonly tag: Repository<Tags>
  ) { }
  create(data: any) {
    const _data = new List()
    return this.list.save(Object.assign(_data, data));
  }

  findAll(status: Status) {
    console.log(status)
    return {
      message: "获取全部"
    };
  }
  async addTags(data: { tags: string[], id: number }) {
    console.log(data, '========>')
    const { tags, id } = data
    const tagsList: Tags[] = []
    for (var i = 0; i < tags.length; i++) {
      const T = new Tags()
      T.name = tags[i]
      await this.tag.save(T)
      tagsList.push(T)
    }
    const list = await this.list.findOne({
      where: {
        id
      }
    })
    list.tags = tagsList
    return this.list.save(list)
  }

  async transForm(data: { fromId: number, toId: number, counts: number }) {
    const { fromId, toId, counts } = data;
    let result: any = '事务开始执行';
  
    try {
      console.log('事务开始执行==================')
      result = await this.list.manager.transaction(async (list) => {
        const from = await this.list.findOne({
          where: { id: data.fromId },
        });
        const to = await this.list.findOne({
          where: { id: data.toId },
        });
  
        console.log(from, to, '================================');
        console.log(from.count, fromId, toId, counts, from.count >= data.counts);
        console.log('事务查询执行==================')
        if (from.count >= counts) {
          await list.save(List, { id: from.id, count: from.count - data.counts });
          await list.save(List, { id: to.id, count: to.count + data.counts });
          console.log('事务执行更新操作==================')
          return '转账成功';
        } else {
          return '转账失败';
        }

      });
    } catch (error) {
      console.log('事务执行报错==================')
      result = error.message || error;
    }
    console.log('事务执行结束==================', result)
    return {
      message: result,
    };
    // return new Promise((res) => {
    //   res({message: result})
    // })
  }
  

  async getList(data: { keyword: string, page: number, pageSize: number }) {
    const { keyword, page, pageSize } = data
    const _data = await this.list.find({
      relations: ['tags'],
      where: {
        name: Like(`%${keyword}%`)
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: {
        id: 'DESC' // 倒序
      }
    })
    const total = await this.list.count({
      where: {
        name: Like(`%${keyword}%`)
      }
    })
    return {
      data: _data,
      total
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} list`;
  }

  update(id: number, updateListDto: UpdateListDto) {
    return this.list.update(id, updateListDto);
  }

  remove(id: number) {
    return this.list.delete(id);
  }
}
