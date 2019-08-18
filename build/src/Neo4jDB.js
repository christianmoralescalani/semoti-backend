"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const neo4j_driver_1 = require("neo4j-driver");
//dotenv.config();
class Neo4jDB {
    constructor() {
        this.URI = `${process.env.URI_NEO4J}`;
        this.USUARIO = `${process.env.NEO4J_USER}`;
        this.CONTRASENA = `${process.env.NEO4J_PASSWORD}`;
        this.AUTH = neo4j_driver_1.v1.auth.basic(this.USUARIO, this.CONTRASENA);
        this.DRIVER = neo4j_driver_1.v1.driver(this.URI, this.AUTH);
        this.SESSION = this.DRIVER.session();
        if (this.SESSION) {
            console.log("Neo4j is connect");
        }
        else {
            console.log("Error al conectar");
        }
    }
    Run(consulta) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.SESSION.run(consulta);
        });
    }
    Close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.SESSION.close(() => {
                console.log("Session cerrada");
            });
        });
    }
}
exports.default = Neo4jDB;
