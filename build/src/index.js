"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const database_1 = __importDefault(require("./database"));
const NoticiasRoutes_1 = __importDefault(require("./routes/NoticiasRoutes"));
const UsuariosRoutes_1 = __importDefault(require("./routes/UsuariosRoutes"));
const SemanticaRoutes_1 = __importDefault(require("./routes/SemanticaRoutes"));
//Initializacion
const app = express_1.default();
//dotenv.config();
database_1.default.start();
//Middlewares
app.use(express_1.default.static('public'));
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
//app.use(express.urlencoded({extended:true}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(helmet_1.default());
//Configuration
app.set('PORT', process.env.PORT || 3000);
app.set('SECRETJWT', process.env.SECRET_JWT);
//Importing Routes
app.use('/noticias', NoticiasRoutes_1.default);
app.use('/usuarios', UsuariosRoutes_1.default);
app.use('/semantica', SemanticaRoutes_1.default);
//Init Server
app.listen(app.get('PORT'), () => {
    console.log(`Server on PORT ${app.get('PORT')}`);
});
