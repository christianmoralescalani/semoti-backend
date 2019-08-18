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
const NoticiasModel_1 = require("../models/NoticiasModel");
class NoticiasController {
    BuscarNoticiasFecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fecha = req.params.fecha;
            const noticias = yield NoticiasModel_1.noticiaSchema.find({ fecha: fecha });
            if (noticias.length > 0) {
                res.json({
                    status: "Correcto",
                    mensaje: noticias
                });
            }
            else {
                res.json({
                    status: "Error",
                    mensaje: "No hay noticias en esta fecha"
                });
            }
        });
    }
    BuscarNoticiasFuenteFecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fuente = req.params.fuente;
            const fecha = req.params.fecha;
            let noticias = [];
            if (fuente === 'TODOS' && fecha === 'Sin Fecha') {
                noticias = yield NoticiasModel_1.noticiaSchema.find();
            }
            else {
                if (fuente != 'TODOS' && fecha != 'Sin Fecha') {
                    noticias = yield NoticiasModel_1.noticiaSchema.find({ fuente: fuente, fecha: fecha });
                }
                else {
                    if (fuente === 'TODOS') {
                        noticias = yield NoticiasModel_1.noticiaSchema.find({ fecha: fecha });
                    }
                    else {
                        if (fecha === 'Sin Fecha') {
                            noticias = yield NoticiasModel_1.noticiaSchema.find({ fuente: fuente });
                        }
                    }
                }
            }
            if (noticias.length > 0) {
                res.json({
                    status: "Correcto",
                    mensaje: noticias
                });
            }
            else {
                res.json({
                    status: "Fallido",
                    mensaje: "No hay noticias guardadas con esta fecha o con esta fuente"
                });
            }
        });
    }
    BuscarNoticiaIDMONGO(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.idNoticias;
            const noticias = yield NoticiasModel_1.noticiaSchema.findById(id);
            if (noticias) {
                res.json({
                    status: "Correcto",
                    mensaje: noticias
                });
            }
            else {
                res.json({
                    status: "Fallido",
                    mensaje: "No se encuentra la noticia"
                });
            }
        });
    }
    CantidadNoticias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cantidad = yield NoticiasModel_1.noticiaSchema.estimatedDocumentCount();
            if (cantidad > 0) {
                res.json({
                    status: "Correcto",
                    mensaje: cantidad
                });
            }
            else {
                res.json({
                    status: "Error",
                    mensaje: "No se pudo encontrar el número de noticias"
                });
            }
        });
    }
}
const noticiasController = new NoticiasController();
exports.noticiasController = noticiasController;
