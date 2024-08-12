"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Date: 2024-05-28 15:22:16
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-05-29 10:24:20
 * @Description:
 */
/*
 * @Date: 2024-05-28 15:22:16
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-05-28 17:50:04
 * @Description:
 */
const app_1 = __importDefault(require("./app"));
const app_config_1 = require("./app/app.config");
app_1.default.listen(app_config_1.PORT, () => {
    console.log('🚀 服务已启动!');
});
//# sourceMappingURL=main.js.map