import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import ApiError from './errors/ApiError';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './app/routes';
import httpStatus from 'http-status';
export const app: Application = express();

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5001', credentials: true }));
app.use(cookieParser());

// parsing Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Rules for Api's */

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

//     if (req.method == 'OPTIONS') {
//         res.header('Access-Control-Aloow-Methods', 'PUT, PATCH, POST, DELETE, GET');
//         return res.status(200).send('hello');
//     }
//     next();
// });

/*Routes*/
app.use('/api/v1', routes);

/**Healthcheck **/
app.get('/ping', (req, res, next) => res.status(200).send('pong'));
// Testing
app.get('/', (req, res, next) => {
    throw new ApiError(400, 'bera lagse baal');
});

/**Global Error Handling */
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found'
            }
        ]
    });
    next();
});
