"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Navbar = () => {
    return (react_1.default.createElement("div", { className: "nav" },
        react_1.default.createElement(react_router_dom_1.Link, { to: "/" }, "TO GARAGE"),
        react_1.default.createElement(react_router_dom_1.Link, { to: "/winners" }, "TO WINNERS")));
};
exports.default = Navbar;
