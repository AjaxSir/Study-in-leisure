import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs'
@Injectable()
export class UtilityService {
    async hashField(field: string):Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(field, salt)
    }

    async compareField(field: string, hashedField: string): Promise<boolean> {
        return bcrypt.compare(field, hashedField)
    }
}