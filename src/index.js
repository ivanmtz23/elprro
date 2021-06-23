import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { _config } from './config';

import { logErrors, errorHandler } from './utils/middleware/handlerError';
import { notFoundHandler } from './utils/middleware/notFound';
import { routes } from './routes';

class Server {
    constructor() {
        this.app = express();
        this.port = _config.port;
        this.listen();
        this.middleWares();
        this.routes();
    }

    listen() {
        this.app.listen(this.port, (err) => {
            if (err) console.log(err);
            console.log(`${
                _config.dev ? `Listen on http://localhost:${this.port}` : `listen on port ${this.port}`
            }`)
        })
    }

    middleWares() {
        if(_config.dev){ 
            this.app.use(morgan('dev'));
        }
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }

    routes() {
        routes(this.app);
        this.app.use(logErrors);
        this.app.use(errorHandler);
        this.app.use(notFoundHandler);
    }
}

new Server();