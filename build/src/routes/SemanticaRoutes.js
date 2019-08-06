"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SemanticaController_1 = require("../controllers/SemanticaController");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.Router();
router.use((req, res, next) => {
    const token = req.body.token;
    if (token) {
        jsonwebtoken_1.default.verify(token, req.app.get('SECRETJWT'), (err, decode) => {
            if (err) {
                res.json({
                    status: "Fallido",
                    error: "Token no valido"
                });
            }
            else {
                req.body.decode = decode;
                next();
            }
        });
    }
    else {
        res.json({
            status: "Fallido",
            error: "No se recibio el token"
        });
    }
});
router.post('/categorias', SemanticaController_1.semanticaController.ObtenerCategoriasID);
router.post('/citas', SemanticaController_1.semanticaController.ObtenerCitasID);
router.post('/entidades', SemanticaController_1.semanticaController.ObtenerEntidadesID);
router.post('/conceptos', SemanticaController_1.semanticaController.ObtenerConeptosID);
router.post('/expresiones', SemanticaController_1.semanticaController.ObtenerExpresionesID);
router.post('/cadena', SemanticaController_1.semanticaController.Cadena);
router.post('/busquedaCadena', SemanticaController_1.semanticaController.BusquedaCadena);
exports.default = router;
