import  { Schema,model,Document } from 'mongoose';
interface Usuario extends Document {
    usuario: String,
    googleID: String,
    contrasena: String
}
const Usuarioschema = new Schema({
    usuario: String,
    googleID: String,
    contrasena: String
});
export default model<Usuario>('Usuarios', Usuarioschema);

