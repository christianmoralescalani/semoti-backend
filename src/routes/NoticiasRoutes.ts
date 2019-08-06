import {Router,Request,Response,NextFunction} from 'express';
import {noticiasController} from '../controllers/NoticiasController';
import jwt,{JsonWebTokenError,DecodeOptions} from 'jsonwebtoken';
const router:Router = Router();

//MIDLEWERE DE AUTENTICACION 
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
                console.log(decode);
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

router.get('/fecha/:fecha',noticiasController.BuscarNoticiasFecha);
router.get('/fuente/:fuente/fecha/:fecha',noticiasController.BuscarNoticiasFuenteFecha);
router.get('/noticiaOriginal/:idNoticias',noticiasController.BuscarNoticiaIDMONGO);

export default router;