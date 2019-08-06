import {Router,Request,Response,NextFunction} from 'express';
import {usuariosController} from '../controllers/UsuariosController';


const router:Router = Router();

router.post('/IniciarSesion',usuariosController.IniciarSesion);
router.post('/RegistroLocal',usuariosController.RegistroLocal);
//router.get('/:id',usuariosController.BuscarUsuarioID);
//router.post('/crear',usuariosController.RegistrarseGoogleID);
export default router;