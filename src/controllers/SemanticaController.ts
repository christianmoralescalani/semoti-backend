import { Request, Response } from 'express';
import Neo4jDB from '../Neo4jDB';
import semanticaModel from '../models/SemanticaModel';
interface Categoria {
    relevancia: String;
    categoria: String;
}
class SemanticaController {



    async ObtenerCategoriasID(req: Request, res: Response) {
        
        const id = req.body.id;
        const categorias = await semanticaModel.ObtenerCategoriasID(id);
        res.json(categorias);


    }
    async ObtenerCitasID(req: Request, res: Response){
        const id = req.body.id;
        const citas = await semanticaModel.ObtenerCitasID(id);
        res.json(citas);
    }
    async ObtenerEntidadesID(req: Request, res: Response){
        const id = req.body.id;
        const entidades = await semanticaModel.ObtenerEntidadesID(id);
        res.json(entidades);
    }
    async ObtenerConeptosID(req: Request, res: Response){
        const id = req.body.id;
        const conceptos = await semanticaModel.ObtenerConceptosID(id);
        res.json(conceptos);
    }
    async ObtenerExpresionesID(req: Request, res: Response){
        const id = req.body.id;
        const expresiones = await semanticaModel.ObtenerExpresionesID(id);
        res.json(expresiones);
    }
    async Cadena(req: Request, res: Response){
        const cadena = req.body.cadena;
        const resp = await semanticaModel.Cadena(cadena);
        res.json(resp);
    }
    async BusquedaCadena(req: Request, res: Response){
        const cadena = req.body.cadena;
        const resp = await semanticaModel.BusquedaCadena(cadena);
        res.json(resp);
    }
}
const semanticaController = new SemanticaController();
export { semanticaController };