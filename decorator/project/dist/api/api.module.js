"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./controllers/user.controller");
const upload_controller_1 = require("./controllers/upload.controller");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const serve_static_1 = require("@nestjs/serve-static");
let ApiModule = class ApiModule {
};
exports.ApiModule = ApiModule;
exports.ApiModule = ApiModule = __decorate([
    (0, common_1.Module)({
        controllers: [user_controller_1.UserController, upload_controller_1.UploadController],
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '../images'),
                serveRoot: '/images'
            }),
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: (0, path_1.join)(__dirname, '../images'),
                    filename: (_, file, cb) => {
                        const filename = `${new Date().getTime()}${(0, path_1.extname)(file.originalname)}`;
                        cb(null, filename);
                    },
                }),
                fileFilter: (req, file, callback) => {
                    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                        callback(null, true);
                    }
                    else {
                        callback(new Error('Only JPG and PNG format allowed!'), false);
                    }
                },
                limits: {
                    fileSize: 1024 * 1024 * 5,
                }
            })
        ]
    })
], ApiModule);
//# sourceMappingURL=api.module.js.map