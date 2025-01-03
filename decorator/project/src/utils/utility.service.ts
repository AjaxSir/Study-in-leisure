import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs'
import * as path from "path";
import * as sharp from "sharp";
import * as fs from 'fs'
@Injectable()
export class UtilityService {
    async hashField(field: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(field, salt)
    }

    async compareField(field: string, hashedField: string): Promise<boolean> {
        return bcrypt.compare(field, hashedField)
    }

    async compressImages(file: Express.Multer.File): Promise<string> {
        const outputDir = path.join(__dirname, '../images');
        const compressDir = path.join(outputDir, 'compress')
        if (!fs.existsSync(compressDir)) {
            fs.mkdirSync(compressDir, { recursive: true });
          }
        const fileName = file.filename;
        const compressedImageBuffer = await sharp(file.path)
            .webp({ quality: 75 }) 
            .toBuffer();
            
        fs.writeFileSync(path.join(compressDir, fileName), compressedImageBuffer);
        return fileName;
        
    }
}