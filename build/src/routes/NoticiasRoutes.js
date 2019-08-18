"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NoticiasController_1 = require("../controllers/NoticiasController");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.Router();
//MIDLEWERE DE AUTENTICACION 
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
router.post('/fecha/:fecha', NoticiasController_1.noticiasController.BuscarNoticiasFecha);
router.post('/fuente/:fuente/fecha/:fecha', NoticiasController_1.noticiasController.BuscarNoticiasFuenteFecha);
router.post('/noticiaOriginal/:idNoticias', NoticiasController_1.noticiasController.BuscarNoticiaIDMONGO);
router.post('/cantidadNoticias', NoticiasController_1.noticiasController.CantidadNoticias);
exports.default = router;
