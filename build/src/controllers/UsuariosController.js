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
const UsuariosModels_1 = __importDefault(require("../models/UsuariosModels"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UsuariosController {
    IniciarSesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body.usuario;
            const contrasena = req.body.contrasena;
            const resultado = yield UsuariosModels_1.default.findOne({ usuario, contrasena });
            if (resultado) {
                const token = jsonwebtoken_1.default.sign({ resultado }, req.app.get('SECRETJWT'));
                res.json({
                    status: "Correcto",
                    mensaje: {
                        token
                    }
                });
            }
            else {
                res.json({ status: "Fallido", mensaje: "No se encuentra el usuario" });
            }
        });
    }
    RegistroLocal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario, contrasena } = req.body;
            const resultado = yield UsuariosModels_1.default.findOne({ usuario, contrasena });
            if (resultado) {
                res.json({ status: "Fallido", mensaje: "Ya existe el usuario" });
            }
            else {
                const usuarioNuevo = yield new UsuariosModels_1.default({ usuario, contrasena }).save();
                if (usuarioNuevo) {
                    res.json({
                        status: "Correcto",
                        mensaje: usuarioNuevo
                    });
                }
                else {
                    res.json({
                        status: "Fallido",
                        mensaje: "Error al guardar el usuario"
                    });
                }
            }
        });
    }
}
const usuariosController = new UsuariosController();
exports.usuariosController = usuariosController;
