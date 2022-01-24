"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const MyButton_1 = __importDefault(require("../../UI/button/MyButton"));
const MyInput_1 = __importDefault(require("../../UI/input/MyInput"));
require("./Garage.scss");
const axios_1 = __importDefault(require("axios"));
const Car_1 = __importDefault(require("../../Car"));
const brands_cars_1 = require("../../../cars/brands-cars");
const models_cars_1 = require("../../../cars/models-cars");
const pages_1 = require("../../../utils/pages");
const CarService_1 = __importDefault(require("../../../API/CarService"));
const Pagination_1 = __importDefault(require("../../UI/pagination/Pagination"));
const CounterCars_1 = __importDefault(require("../../CounterCars"));
const Garage = () => {
    const [carsCount, setCarsCount] = (0, react_1.useState)(0);
    const [cars, setCars] = (0, react_1.useState)([]);
    const [newCar, setNewCar] = (0, react_1.useState)({ name: '', color: '#ffffff' });
    const [changeCar, setChangeCar] = (0, react_1.useState)({});
    const [totalPages, setTotalPages] = (0, react_1.useState)(0);
    const [limit] = (0, react_1.useState)(7);
    const [page, setPage] = (0, react_1.useState)(1);
    const [drive, setDrive] = (0, react_1.useState)(false);
    const [resetBtn, setResetBtn] = (0, react_1.useState)([]);
    const getResetBtn = (bool) => __awaiter(void 0, void 0, void 0, function* () {
        const newArr = [...resetBtn, bool];
        yield setResetBtn(newArr);
    });
    const changePage = (page) => {
        setPage(page);
    };
    const addNewCar = (e) => {
        e.preventDefault();
        axios_1.default.post('http://127.0.0.1:3000/garage', newCar);
        setNewCar({ name: '', color: '#ffffff' });
        fetchCars();
    };
    const removeCar = (id) => {
        axios_1.default.delete(`http://127.0.0.1:3000/garage/${id}`);
        fetchCars();
    };
    const editCar = (changeName, changeColor, idCar) => {
        setChangeCar({ name: changeName, color: changeColor, id: idCar });
    };
    const updateCar = () => {
        axios_1.default.put(`http://127.0.0.1:3000/garage/${changeCar.id}`, changeCar);
        setChangeCar({ name: '', color: '#ffffff' });
        fetchCars();
    };
    const generateCars = () => {
        for (let i = 0; i < 100; i += 1) {
            const getCarBrand = getRandomInt(0, brands_cars_1.brandsCars.length - 1);
            const getCarModel = getRandomInt(0, models_cars_1.modelsCars.length - 1);
            axios_1.default.post('http://127.0.0.1:3000/garage', ({ name: `${brands_cars_1.brandsCars[getCarBrand]} ${models_cars_1.modelsCars[getCarModel]}`, color: getRandomColor() }));
        }
        fetchCars();
    };
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i += 1) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    function fetchCars() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield CarService_1.default.getAll(limit, page);
            const totalCount = response.headers['x-total-count'];
            setCarsCount(totalCount);
            setCars(response.data);
            setTotalPages((0, pages_1.getPageCount)(totalCount, limit));
        });
    }
    (0, react_1.useEffect)(() => {
        fetchCars();
    }, [page]);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "header" },
            react_1.default.createElement("div", { className: "create" },
                react_1.default.createElement(MyInput_1.default, { value: newCar.name, onChange: e => setNewCar(Object.assign(Object.assign({}, newCar), { name: e.target.value })), type: "text" }),
                react_1.default.createElement("input", { onChange: e => setNewCar(Object.assign(Object.assign({}, newCar), { color: e.target.value })), type: "color" }),
                react_1.default.createElement(MyButton_1.default, { onClick: addNewCar }, "CREATE")),
            react_1.default.createElement("div", { className: "update" },
                react_1.default.createElement(MyInput_1.default, { value: changeCar.name, onChange: e => setChangeCar(Object.assign(Object.assign({}, changeCar), { name: e.target.value })), type: "text" }),
                react_1.default.createElement("input", { onChange: e => setChangeCar(Object.assign(Object.assign({}, changeCar), { color: e.target.value })), type: "color" }),
                react_1.default.createElement(MyButton_1.default, { onClick: updateCar }, "UPDATE")),
            react_1.default.createElement("div", { className: "race" },
                react_1.default.createElement("button", { onClick: () => setDrive(true), disabled: drive }, "RACE"),
                react_1.default.createElement("button", { onClick: () => setDrive(false), disabled: !drive }, "RESET"),
                react_1.default.createElement(MyButton_1.default, { onClick: generateCars }, "GENERATE CARS")),
            react_1.default.createElement("div", { className: "body" },
                react_1.default.createElement(CounterCars_1.default, { carsCount: carsCount, page: page, nameCounter: 'Garage' }),
                cars.map((item) => react_1.default.createElement(Car_1.default, { key: item.id, id: item.id, name: item.name, color: item.color, removeCar: removeCar, editCar: editCar, drive: drive, getResetBtn: getResetBtn })),
                react_1.default.createElement(Pagination_1.default, { page: page, changePage: changePage, totalPages: totalPages })))));
};
exports.default = Garage;
