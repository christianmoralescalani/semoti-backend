import { Request, Response } from 'express';
import { Noticia, noticiaSchema } from '../models/NoticiasModel';
class NoticiasController {
    async BuscarNoticiasFecha(req: Request, res: Response) {
        const fecha: String = req.params.fecha;
        const noticias = await noticiaSchema.find({ fecha: fecha });
        if(noticias.length>0){
            res.json({
                status: "Correcto",
                mensaje: noticias
            });
        }else{
            res.json({
                status: "Error",
                mensaje: "No hay noticias en esta fecha"
            });
        }
        

    }
    async BuscarNoticiasFuenteFecha(req: Request, res: Response) {
        const fuente: String = req.params.fuente;
        const fecha: String = req.params.fecha;
        let noticias: object[] = [];
        if (fuente === 'TODOS' && fecha === 'Sin Fecha') {
            noticias = await noticiaSchema.find();
        } else {
            if (fuente != 'TODOS' && fecha != 'Sin Fecha') {
                noticias = await noticiaSchema.find({ fuente: fuente, fecha: fecha });
            }
            else {
                if (fuente === 'TODOS') {
                    noticias = await noticiaSchema.find({ fecha: fecha });
                }
                else {
                    if (fecha === 'Sin Fecha') {
                        noticias = await noticiaSchema.find({ fuente: fuente });
                    }
                }
            }
        }
        if(noticias.length>0){
            res.json({
                status: "Correcto",
                mensaje: noticias
            });
        }else{
            res.json({
                status: "Fallido",
                mensaje: "No hay noticias guardadas con esta fecha o con esta fuente"
            });
        }
        
    }
    async BuscarNoticiaIDMONGO(req: Request, res: Response){
        const id:string = req.params.idNoticias;
        const noticias = await noticiaSchema.findById(id);
        if(noticias){
            res.json({
                status: "Correcto",
                mensaje: noticias
            });
        }else{
            res.json({
                status: "Fallido",
                mensaje: "No se encuentra la noticia"            
            });
        }
        
    }

   
}
const noticiasController = new NoticiasController();
export {noticiasController};