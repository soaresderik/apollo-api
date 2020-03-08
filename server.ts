import "reflect-metadata";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import authors from "./modules/author/author.service";

const PORT = 3333;
const path = "/graphql";

(async () => {
    const schema = await buildSchema({
        resolvers: [__dirname + "/modules/**/*.resolver.ts"],
        authChecker: ({ context }, roles) => {
            if (!roles.includes(context.user?.role))
                throw new Error("Usuário não autorizado!");
            return true;
        },
        authMode: "null",
    });

    const apollo = new ApolloServer({
        schema,
        context: ({ req }: any) => {
            const { email } = req.headers;
            const user = authors.find(a => a.email === email);
            const ctx = {
                req,
                user
            };
            return ctx;
        }
    });

    const app = express();

    apollo.applyMiddleware({ app, path });

    // tslint:disable-next-line: no-console
    app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}${apollo.graphqlPath}`));
})();