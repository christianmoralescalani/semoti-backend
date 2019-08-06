import mongoose,{Schema} from 'mongoose';
interface Noticia{
titulo:String,
url:String,
cuerpo:String,
fuente:String,
fecha:String,
foto:String,
etiquetado:Boolean,
resumen:String
}
const Noticiaschema = new Schema<Noticia>({
    titulo:{type:String},
    url:{type:String},
    cuerpo:{type:String},
    fuente:{type:String},
    fecha:{type:String},
    foto:{type:String},
    etiquetado:{type:Boolean},
    resumen:{type:String}
});
const noticiaSchema = mongoose.model('Noticias',Noticiaschema);
export {Noticia,noticiaSchema};