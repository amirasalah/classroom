import Promise from 'bluebird';
import mongoose from 'mongoose';
import config from './config';
import Express from './config/express';

/**
 * Promisify All The Mongoose
 * @param mongoose
 */
Promise.promisifyAll(mongoose);

/**
 * Connecting Mongoose
 * @param uris
 * @param options 
 */
mongoose.connect(config.db, {
    socketTimeoutMS: 0,
});
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.db}`);
});

const ExpressServer = new Express();
ExpressServer.init();

ExpressServer.httpServer.listen(process.env.PORT || config.port, () => {
    console.log(`🚀  Server ready at ${config.port}`);
    console.log(
        `🚀 Server ready at http://localhost:${config.port}${ExpressServer.server.graphqlPath}`
    );
    console.log(
        `🚀 Subscriptions ready at ws://localhost:${config.port}${ExpressServer.server.subscriptionsPath}`
    );
});