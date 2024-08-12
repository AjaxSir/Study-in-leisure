"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const posts_servers_1 = require("./posts.servers");
const index = (req, res, next) => {
    if (req.headers['auth'] !== 'sxl') {
        return next(new Error('没有权限'));
    }
    const data = (0, posts_servers_1.getList)();
    res.send(data);
};
exports.index = index;
//# sourceMappingURL=posts.controller.js.map