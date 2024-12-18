import { Injectable } from '@nestjs/common';
import { CreateSpiderDto } from './dto/create-spider.dto';
import { UpdateSpiderDto } from './dto/update-spider.dto';
import axios from 'axios';
import * as cheerio from 'cheerio'
import { join } from 'path'
import * as  fs from 'fs';
@Injectable()
export class SpiderService {
  create(createSpiderDto: CreateSpiderDto) {
    return 'This action adds a new spider';
  }

  findAll() {
    const urls: string[] = []
    const getBody = async () => {
      const body = await axios.get('https://m.duitang.com/category/?cat=animation&sub_id=0037').then(res => res.data)
      console.log(body)
      // const pathFile = join(__dirname, '../html')
      // if(!fs.existsSync(pathFile)) {
      //   fs.mkdirSync(pathFile, { recursive: true })
      // }
      // fs.writeFileSync(join(__dirname, '../html', 'index.html'), body)
      const $ = cheerio.load(body)
      const imgs = $('.am-card .css-b3pn3b').find('img')
      console.log(imgs, imgs.length)
      imgs.each((_index, ele) => {
        urls.push($(ele).attr('src'))
      })
      console.log(urls, 'urls')
      downLoad(urls)
    }

    const downLoad = (url: string[]) => {
      const pathDir = join(__dirname, '../down')
      if(!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir, { recursive: true })
      }
      url.forEach(async e => {
        const data = await axios.get(e, { responseType: 'arraybuffer' }).then(response => response.data)
        const pathFile = join(__dirname, '../down', `${Date.now()}_${Math.random()}.jpg`)
        const ws = fs.createWriteStream(pathFile)
        ws.write(data)
      })
    }

    getBody()
    
    return `This action returns all spider`;
  }

  findOne(id: number) {
    return `This action returns a #${id} spider`;
  }

  update(id: number, updateSpiderDto: UpdateSpiderDto) {
    return `This action updates a #${id} spider`;
  }

  remove(id: number) {
    return `This action removes a #${id} spider`;
  }
}
