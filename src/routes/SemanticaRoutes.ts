import {Router,Request,Response,NextFunction} from 'express';
import {semanticaController} from '../controllers/SemanticaController';
import jwt,{JsonWebTokenError,DecodeOptions} from 'jsonwebtoken';
const router:Router = Router();


router.use((req:Request,res:Response,next:NextFunction)=>{
    const token = req.body.token;
    if(token){
        jwt.verify(token,req.app.get('SECRETJWT'),(err:any,decode:any)=>{
            if(err){
                res.json({
                    status:"Fallido",
                    error:"Token no valido"
                })
            }
            else{
                req.body.decode = decode;
               
                next();
            }
        });
        
       
    } else{
        res.json({
            status:"Fallido",
            error:"No se recibio el token"
        })
    }

});

router.post('/categorias',semanticaController.ObtenerCategoriasID);
router.post('/citas',semanticaController.ObtenerCitasID);
router.post('/entidades',semanticaController.ObtenerEntidadesID);
router.post('/conceptos',semanticaController.ObtenerConeptosID);
router.post('/expresiones',semanticaController.ObtenerExpresionesID);
router.post('/cadena',semanticaController.Cadena);
router.post('/busquedaCadena',semanticaController.BusquedaCadena);
router.post('/compararNoticia',semanticaController.CompararNoticias);

export default router;