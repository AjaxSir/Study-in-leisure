import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";
import { Logger } from "winston";
export declare class UnifyExceptionFilter implements ExceptionFilter {
    private readonly logger;
    private readonly i18n;
    constructor(logger: Logger, i18n: I18nService);
    catch(exception: any, host: ArgumentsHost): void;
    private formatErrorsMessage;
}
