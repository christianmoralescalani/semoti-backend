import neo4j from '../Neo4jDB';
import { Request, Response } from 'express';
import { Neo4jError } from 'neo4j-driver/types/v1';

interface Categoria {
    relevancia: String;
    categoria: String;
}
interface Citas {
    cita: String
}
interface Entidad {
    entidad: String,
    categoria: String,
    relevancia: String
}
interface Concepto {
    concepto: String,
    categoria: String,
    relevancia: String
}
interface Expresion {
    expresion: String,
    categoria: String
}

class SemanticaModel {

    async ObtenerCategoriasID(id: string) {
        const neo = new neo4j();
        const categorias: Categoria[] = [];
        const resultado = await neo.Run(`MATCH (n:Noticia)-[r:PerteneceCategoria]-(b:CategoriaNoticia) where tolower(n.id) CONTAINS tolower("${id}") return r.relevancia,b.name`);
        const campos = resultado.records;

        for (let i = 0; i < campos.length; i++) {
            let categoria2: Categoria = {
                relevancia: campos[i].get('r.relevancia'),
                categoria: campos[i].get('b.name')
            };
            categorias.push(categoria2);

        }
        await neo.Close();
        return categorias;
    }
    async ObtenerCitasID(id: string) {
        const neo = new neo4j();
        const citas: Citas[] = [];
        let resultado = await neo.Run(`MATCH (n:Noticia)-[r:NoticiaTieneCita]->(b:Cita) where tolower(n.id) CONTAINS tolower("${id}") return b.name`);
        const campos = resultado.records;
        for (let i = 0; i < campos.length; i++) {
            let citas2: Citas = {
                cita: campos[i].get('b.name')
            };
            citas.push(citas2);
        }
        await neo.Close();
        return citas;
    }
    async ObtenerEntidadesID(id: string) {
        const neo = new neo4j();
        const entidades: Entidad[] = [];
        let resultado = await neo.Run(`MATCH (n:Noticia)-[r:NoticiaTieneEntidad]->(b:Entidad)-[r2:EntidadCategoriaDe]->(c:CategoriaEntidad) where tolower(n.id) CONTAINS tolower("${id}") return distinct b.name,c.name,r.relevancia order by c.name`);
        const campos = resultado.records;
        for (let i = 0; i < campos.length; i++) {
            let entidades2: Entidad = {
                categoria: campos[i].get('c.name'),
                entidad: campos[i].get('b.name'),
                relevancia: campos[i].get('r.relevancia')
            };
            entidades.push(entidades2);
        }
        await neo.Close();
        return entidades;
    }
    async ObtenerConceptosID(id: string) {
        const neo = new neo4j();
        const conceptos: Concepto[] = [];
        let resultado = await neo.Run(`MATCH (n:Noticia)-[r:NoticiaTieneConcepto]->(b:Concepto)-[r2:ConceptoCategoriaDe]->(c:CategoriaConcepto) where tolower(n.id) CONTAINS tolower("${id}") return distinct b.name,c.name,r.relevancia order by c.name`);
        const campos = resultado.records;
        for (let i = 0; i < campos.length; i++) {
            let conceptos2: Concepto = {
                concepto: campos[i].get('b.name'),
                categoria: campos[i].get('c.name'),
                relevancia: campos[i].get('r.relevancia')
            };
            conceptos.push(conceptos2);
        }
        await neo.Close();
        return conceptos;
    }
    async ObtenerExpresionesID(id: string) {
        const neo = new neo4j();
        const expresiones: Expresion[] = [];
        let resultado = await neo.Run(`MATCH (n:Noticia)-[r:NoticiaTieneExpresion]->(b:Expresion)-[r2:ExpresionCategoriaDe]->(c:CategoriaExpresion) where tolower(n.id) CONTAINS tolower("${id}") return distinct b.name,c.name order by c.name`);
        const campos = resultado.records;
        for (let i = 0; i < campos.length; i++) {
            let expresiones2: Expresion = {
                expresion: campos[i].get('b.name'),
                categoria: campos[i].get('c.name'),

            };
            expresiones.push(expresiones2);
        }
        await neo.Close();
        return expresiones;
    }
    async Cadena(cadena: string) {
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
    }
    async BusquedaCadena(cadena: string) {
        const neo = new neo4j();
        const consulta = await this.Cadena(cadena);
        const resultado: any[] = [];
        let resp = await neo.Run(consulta);
        const campos = resp.records;
        for (let i = 0; i < campos.length; i++) {
            let expresiones2: any = {
                noticia: campos[i].get('a'),
                nodoA: campos[i].get('collect(b)'),
                nodoB: campos[i].get('collect(c)')

            };
            resultado.push(expresiones2);
        }
        await neo.Close();
        return resultado;
    }

    DividirCadena(cadena: string) {
        let arrayPalabras = cadena.split('>');
        return arrayPalabras;
    }
    AgregarCondicionales(palabra: string) {
        let consulta = ` tolower(b.name) CONTAINS tolower("${palabra}") or tolower(c.name) CONTAINS tolower("${palabra}") `;
        return consulta;
    }
    AgregarCondicionalesPrimero(palabra: string) {
        let consulta = ` or tolower(b.name) CONTAINS tolower("${palabra}") or tolower(c.name) CONTAINS tolower("${palabra}") `;
        return consulta;
    }
    async CompararNoticias(id_noticia: string) {
        const neo = new neo4j();

        const categoriasComparar: any[] = [];
        const noticiasEncontradas: any[]= [];
        let resultado = await neo.Run(`match (a:Noticia)-[r:PerteneceCategoria]-(b:CategoriaNoticia) where a.id = '${id_noticia}' return b.name`);
        const campos = resultado.records;
        for (let i = 0; i < campos.length; i++) {
            let categorias2 = campos[i].get('b.name');
            categoriasComparar.push(categorias2);
        }
        for (let i = 0; i < categoriasComparar.length; i++) {
            let res = await neo.Run(`match (a:Noticia)-[r:PerteneceCategoria]-(b:CategoriaNoticia) where b.name = '${categoriasComparar[i]}' return DISTINCT a.name,a.id`);
            const camp = res.records;
            for (let i = 0; i < camp.length; i++) {
                const obj = {
                    titulo : camp[i].get('a.name'),
                    id: camp[i].get('a.id')
                }
                noticiasEncontradas.push(obj);
            }
        }
        await neo.Close();
        return noticiasEncontradas;
    }




}

const semanticaModel = new SemanticaModel();
export default semanticaModel;