"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const Noticiaschema = new mongoose_1.Schema({
    titulo: { type: String },
    url: { type: String },
    cuerpo: { type: String },
    fuente: { type: String },
    fecha: { type: String },
    foto: { type: String },
    etiquetado: { type: Boolean },
    resumen: { type: String }
});
const noticiaSchema = mongoose_1.default.model('Noticias', Noticiaschema);
exports.noticiaSchema = noticiaSchema;
