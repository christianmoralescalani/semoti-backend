import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongodb from './database';

import noticiasRoutes from './routes/NoticiasRoutes';
import usuarioRoutes from './routes/UsuariosRoutes';
import semanticaRoutes from './routes/SemanticaRoutes';

//Initializacion
const app = express();
dotenv.config();
mongodb.start();



//Middlewares
app.use(morgan('dev'));
app.use(express.json());
//app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: `http://${process.env.FRONT_IP}`
}));
app.use(helmet());
//Configuration
app.set('PORT', process.env.PORT || 3000);
app.set('SECRETJWT',process.env.SECRET_JWT);
//Importing Routes
app.use('/noticias',noticiasRoutes);
app.use('/usuarios',usuarioRoutes);
app.use('/semantica',semanticaRoutes);
//Init Server
app.listen(app.get('PORT'), () => {
    console.log(`Server on PORT ${app.get('PORT')}`);
});
