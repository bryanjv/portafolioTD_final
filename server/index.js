import express from "express";
import hbs from "hbs";
import routes from "./routes/routes.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import session from "express-session";
import { requestLogger } from "./utils/functions.js";

const app = express();

app.use(session({ //Uso de express-session para almacenar la sesion de un usuario y que la pagina cambie de acuerdo a quien ha ingresado
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.json()); //Middleware para obtener en json algunos datos
app.use(express.urlencoded({ extended: true })); 
app.use(requestLogger);


const __filename = fileURLToPath(import.meta.url); //Trabajo de paths
const __dirname = dirname(__filename);

app.set("view engine","hbs");
hbs.registerPartials(join(dirname(fileURLToPath(import.meta.url)), "./views/partials"));//Registro de Partials de hbs
app.use(routes);
app.use(express.static(join(__dirname,"../client/public"))); //Recursos estaticos para el cliente

app.use("/bootstrap/css", express.static(join(__dirname,"./node_modules/bootstrap/dist/css"))); //Obtencion de la ruta de bootstrap para usarlo en el cliente
app.use("/bootstrap/js", express.static(join(__dirname,"./node_modules/bootstrap/dist/js")));

app.listen(3000, () => console.log('server ON'));