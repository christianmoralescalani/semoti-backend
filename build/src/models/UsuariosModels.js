"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Usuarioschema = new mongoose_1.Schema({
    usuario: String,
    googleID: String,
    contrasena: String
});
exports.default = mongoose_1.model('Usuarios', Usuarioschema);
