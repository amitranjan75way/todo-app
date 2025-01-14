import express, { type Express, type Request, type Response } from "express";
import bodyParser from "body-parser";
import { loadConfig } from './app/common/helper/config.helper';
import { initDb } from './app/common/service/database.service';
import routes from './app/routes';
import http from "http";
import morgan from "morgan"; 
import errorHandler from "./app/common/middleware/error-handler.middleware";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./app/swagger/swagger"; // Import Swagger JSON file

loadConfig();
const PORT = process.env.PORT || 5000;

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));

const initApp = async () => {
    await initDb();

    // Set up Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use('/api', routes);
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello World');
    });

    app.use(errorHandler);

    http.createServer(app).listen(PORT, () => {
        console.log("Server is running on port", PORT);
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
};

initApp();
