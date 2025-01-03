export declare class UtilityService {
    hashField(field: string): Promise<string>;
    compareField(field: string, hashedField: string): Promise<boolean>;
    compressImages(file: Express.Multer.File): Promise<string>;
}
