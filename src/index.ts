import express from 'express';
import routes from './api/routes';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from './api/middlewares/logger.middleware';
import { generateToken } from './api/utils/jwt.utils';
import errorHandler from './api/middlewares/error-handler.middleware';

const app = express();
const port = 3000;

if (process.env.NODE_ENV !== 'production') {
    console.log('JWT', generateToken());
}

// compress all responses
app.use(compression())

// adding set of security middlewares
app.use(helmet())

// enable all cors requests
app.use(cors())


// parse incoming request body and append data to `req.body`
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(logger)

app.use('/api/', routes);
// http://localhost:3000/api/teams

app.use(errorHandler)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

