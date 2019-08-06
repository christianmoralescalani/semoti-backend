import { Request, Response } from 'express';
import Usuarios from '../models/UsuariosModels';
import jwt from 'jsonwebtoken';
class UsuariosController {

    async IniciarSesion(req: Request, res: Response) {

        const usuario: String = req.body.usuario;
        const contrasena: String = req.body.contrasena;
        const resultado = await Usuarios.findOne({ usuario, contrasena });
        if (resultado) {
            const token = jwt.sign({ resultado }, req.app.get('SECRETJWT'));
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
    }

    async RegistroLocal(req: Request, res: Response) {
        const { usuario, contrasena } = req.body;
        const resultado = await Usuarios.findOne({ usuario, contrasena });
        if (resultado) {
            res.json({ status: "Fallido", mensaje: "Ya existe el usuario" });
        } else {
            const usuarioNuevo = await new Usuarios({ usuario, contrasena }).save();
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
    }

}
const usuariosController = new UsuariosController();
export { usuariosController };