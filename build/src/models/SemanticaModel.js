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
const Neo4jDB_1 = __importDefault(require("../Neo4jDB"));
class SemanticaModel {
    ObtenerCategoriasID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const neo = new Neo4jDB_1.default();
            const categorias = [];
            const resultado = yield neo.Run(`MATCH (n:Noticia)-[r:PerteneceCategoria]-(b:CategoriaNoticia) where tolower(n.id) CONTAINS tolower("${id}") return r.relevancia,b.name`);
            const campos = resultado.records;
            for (let i = 0; i < campos.length; i++) {
                let categoria2 = {
                    relevancia: campos[i].get('r.relevancia'),
                    categoria: campos[i].get('b.name')
                };
                categorias.push(categoria2);
            }
            yield neo.Close();
            return categorias;
        });
    }
    ObtenerCitasID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const neo = new Neo4jDB_1.default();
            const citas = [];
            let resultado = yield neo.Run(`MATCH (n:Noticia)-[r:NoticiaTieneCita]->(b:Cita) where tolower(n.id) CONTAINS tolower("${id}") return b.name`);
            const campos = resultado.records;
            for (let i = 0; i < campos.length; i++) {
                let citas2 = {
                    cita: campos[i].get('b.name')
                };
                citas.push(citas2);
            }
            yield neo.Close();
            return citas;
        });
    }
    ObtenerEntidadesID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const neo = new Neo4jDB_1.default();
            const entidades = [];
            let resultado = yield neo.Run(`MATCH (n:Noticia)-[r:NoticiaTieneEntidad]->(b:Entidad)-[r2:EntidadCategoriaDe]->(c:CategoriaEntidad) where tolower(n.id) CONTAINS tolower("${id}") return distinct b.name,c.name,r.relevancia order by c.name`);
            const campos = resultado.records;
            for (let i = 0; i < campos.length; i++) {
                let entidades2 = {
                    categoria: campos[i].get('c.name'),
                    entidad: campos[i].get('b.name'),
                    relevancia: campos[i].get('r.relevancia')
                };
                entidades.push(entidades2);
            }
            yield neo.Close();
            return entidades;
        });
    }
    ObtenerConceptosID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const neo = new Neo4jDB_1.default();
            const conceptos = [];
            let resultado = yield neo.Run(`MATCH (n:Noticia)-[r:NoticiaTieneConcepto]->(b:Concepto)-[r2:ConceptoCategoriaDe]->(c:CategoriaConcepto) where tolower(n.id) CONTAINS tolower("${id}") return distinct b.name,c.name,r.relevancia order by c.name`);
            const campos = resultado.records;
            for (let i = 0; i < campos.length; i++) {
                let conceptos2 = {
                    concepto: campos[i].get('b.name'),
                    categoria: campos[i].get('c.name'),
                    relevancia: campos[i].get('r.relevancia')
                };
                conceptos.push(conceptos2);
            }
            yield neo.Close();
            return conceptos;
        });
    }
    ObtenerExpresionesID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const neo = new Neo4jDB_1.default();
            const expresiones = [];
            let resultado = yield neo.Run(`MATCH (n:Noticia)-[r:NoticiaTieneExpresion]->(b:Expresion)-[r2:ExpresionCategoriaDe]->(c:CategoriaExpresion) where tolower(n.id) CONTAINS tolower("${id}") return distinct b.name,c.name order by c.name`);
            const campos = resultado.records;
            for (let i = 0; i < campos.length; i++) {
                let expresiones2 = {
                    expresion: campos[i].get('b.name'),
                    categoria: campos[i].get('c.name'),
                };
                expresiones.push(expresiones2);
            }
            yield neo.Close();
            return expresiones;
        });
    }
    Cadena(cadena) {
        return __awaiter(this, void 0, void 0, function* () {
            const palabras = this.DividirCadena(cadena);
            let condicionales = "";
            for (let i = 0; i < palabras.length; i++) {
                if (i === 0) {
                    condicionales += this.AgregarCondicionales(palabras[i]);
                }
                else {
                    condicionales += this.AgregarCondicionalesPrimero(palabras[i]);
                }
            }
            let consulta = 'match(a:Noticia)-[r]-(b)-[r2]->(c) where ' + condicionales + ' return distinct a,collect(b),collect(c) order by collect(c)';
            console.log(palabras);
            return consulta;
        });
    }
    BusquedaCadena(cadena) {
        return __awaiter(this, void 0, void 0, function* () {
            const neo = new Neo4jDB_1.default();
            const consulta = yield this.Cadena(cadena);
            const resultado = [];
            let resp = yield neo.Run(consulta);
            const campos = resp.records;
            for (let i = 0; i < campos.length; i++) {
                let expresiones2 = {
                    noticia: campos[i].get('a'),
                    nodoA: campos[i].get('collect(b)'),
                    nodoB: campos[i].get('collect(c)')
                };
                resultado.push(expresiones2);
            }
            yield neo.Close();
            return resultado;
        });
    }
    DividirCadena(cadena) {
        let arrayPalabras = cadena.split('>');
        return arrayPalabras;
    }
    AgregarCondicionales(palabra) {
        let consulta = ` tolower(b.name) CONTAINS tolower("${palabra}") or tolower(c.name) CONTAINS tolower("${palabra}") `;
        return consulta;
    }
    AgregarCondicionalesPrimero(palabra) {
        let consulta = ` or tolower(b.name) CONTAINS tolower("${palabra}") or tolower(c.name) CONTAINS tolower("${palabra}") `;
        return consulta;
    }
}
const semanticaModel = new SemanticaModel();
exports.default = semanticaModel;
