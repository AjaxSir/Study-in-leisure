import { Injectable } from '@nestjs/common'

@Injectable()
export class LoggerService {
    log(message) {
        console.log('LoggerService', message);
    }
}

@Injectable()
export class UseValueService {
    log(message) {
        console.log('useValueService', message);
    }
}