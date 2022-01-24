"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagesArr = exports.getPageCount = void 0;
const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit);
};
exports.getPageCount = getPageCount;
const getPagesArr = (totalPages) => {
    const result = [];
    for (let i = 0; i < totalPages; i += 1) {
        result.push(i + 1);
    }
    return result;
};
exports.getPagesArr = getPagesArr;
