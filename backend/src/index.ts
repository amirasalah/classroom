import bodyParser from "body-parser";
import compression from "compression";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { createServer } from "http";
import initGraphqlServer from "./graphql/server";
import { connect } from "./mongo"; 

dotenv.config();

async function run() {
    const app = express();
    const PORT = process.env.PORT || 4001;  
    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    const db = await connect();

    const graphqlServer = initGraphqlServer(db);

    const httpServer = createServer(app);

    graphqlServer.applyMiddleware({ app });
    graphqlServer.installSubscriptionHandlers(httpServer);

    httpServer.listen(PORT, () => {
        console.log(
            `🚀 Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`
        );
        console.log(
            `🚀 Subscriptions ready at ws://localhost:${PORT}${graphqlServer.subscriptionsPath}`
        );
    });
}

process.on("unhandledRejection", (error) => {
    console.log("unhandledRejection", error);
});

run().then(() => console.log(`Server Successfully Started`));