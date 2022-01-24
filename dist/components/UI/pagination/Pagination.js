"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const pages_1 = require("../../../utils/pages");
const Pagination = ({ totalPages, page, changePage }) => {
    const pagesArray = (0, pages_1.getPagesArr)(totalPages);
    return (react_1.default.createElement("div", { className: "page__wrapper" }, pagesArray.map(p => react_1.default.createElement("span", { key: p, onClick: () => changePage(p), className: page === p ? 'page__count page__current' : 'page__count' }, p))));
};
exports.default = Pagination;
