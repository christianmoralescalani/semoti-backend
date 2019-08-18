"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//dotenv.config();
class MongoDB {
    constructor() {
        this.URI = `${process.env.URI_MONGO}`;
        mongoose_1.default.set('useFindAndModify', true);
    }
    start() {
        console.log(this.URI);
        mongoose_1.default.connect(this.URI, { useNewUrlParser: true }).then(db => console.log(`MongoDB is connect`));
    }
}
const mongodb = new MongoDB();
exports.default = mongodb;
