import mongoose from 'mongoose';
import http, { Server } from 'http';
import { config } from './config/config';
import Logging from './library/Logger';
import { app } from './app';

process.on('uncaughtException', (error) => {
    Logging.error(error);
    process.exit(1);
});

let server: Server;
//database connection

async function bootstrap() {
    try {
        await mongoose.connect(config.mongo.url as string, { retryWrites: true, w: 'majority' });
        Logging.info(`Database connection succesfull!`);

        server = app.listen(config.server.port, () => {
            Logging.info(`Application  listening on port ${config.server.port}`);
        });
    } catch (err) {
        Logging.error('Failed to connect database');
        Logging.error(err);
    }
    process.on('unhandledRejection', (error) => {
        if (server) {
            server.close(() => {
                Logging.error(error);
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
}

bootstrap();
