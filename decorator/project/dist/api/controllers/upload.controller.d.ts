import { UtilityService } from "src/utils/utility.service";
export declare class UploadController {
    private readonly utilityService;
    constructor(utilityService: UtilityService);
    upload(file: Express.Multer.File): Promise<{
        originImage: string;
        compressImage: string;
    }>;
}
