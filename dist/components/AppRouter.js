"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Winners_1 = __importDefault(require("./pages/Winners/Winners"));
const Garage_1 = __importDefault(require("./pages/Garage/Garage"));
const AppRouter = () => {
    return (react_1.default.createElement(react_router_dom_1.Routes, null,
        react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Garage_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/winners", element: react_1.default.createElement(Winners_1.default, null) })));
};
exports.default = AppRouter;
