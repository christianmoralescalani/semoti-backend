"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SemanticaModel_1 = __importDefault(require("../models/SemanticaModel"));
class SemanticaController {
    ObtenerCategoriasID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body.id);
            const id = req.body.id;
            const categorias = yield SemanticaModel_1.default.ObtenerCategoriasID(id);
            res.json(categorias);
        });
    }
    ObtenerCitasID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            const citas = yield SemanticaModel_1.default.ObtenerCitasID(id);
            res.json(citas);
        });
    }
    ObtenerEntidadesID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            const entidades = yield SemanticaModel_1.default.ObtenerEntidadesID(id);
            res.json(entidades);
        });
    }
    ObtenerConeptosID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            const conceptos = yield SemanticaModel_1.default.ObtenerConceptosID(id);
            res.json(conceptos);
        });
    }
    ObtenerExpresionesID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            const expresiones = yield SemanticaModel_1.default.ObtenerExpresionesID(id);
            res.json(expresiones);
        });
    }
    Cadena(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cadena = req.body.cadena;
            const resp = yield SemanticaModel_1.default.Cadena(cadena);
            res.json(resp);
        });
    }
    BusquedaCadena(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cadena = req.body.cadena;
            const resp = yield SemanticaModel_1.default.BusquedaCadena(cadena);
            res.json(resp);
        });
    }
}
const semanticaController = new SemanticaController();
exports.semanticaController = semanticaController;
