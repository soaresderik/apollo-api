import "reflect-metadata";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

const PORT = 3333;

(async () => {
    const schema = await buildSchema({
        resolvers: [__dirname + "/modules/**/*.resolver.ts"],
        authMode: "null",
    });

    const apollo = new ApolloServer({
        schema,
        context: ({ req }: any) => ({ req })
    });

    const app = express();

    apollo.applyMiddleware({ app });

    // tslint:disable-next-line: no-console
    app.listen(PORT, () => console.log(`App running on port ${PORT}`));
})();