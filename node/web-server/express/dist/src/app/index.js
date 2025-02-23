"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_router_1 = __importDefault(require("../posts/posts.router"));
const app_middleware_1 = require("./app.middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(posts_router_1.default);
app.use(app_middleware_1.defaultErrorHandler);
exports.default = app;
//# sourceMappingURL=index.js.map