import { Resolver, Query, Arg, Root, FieldResolver, Authorized, Args, Mutation, Ctx } from "type-graphql";
import Author from "./author.entity";
import authors from "./author.service";
import posts from "../posts/post.service";
import { Post } from "../posts/post.entity";
import { LoginArgs } from "./author.args";
import { ContextParamMetadata } from "type-graphql/dist/metadata/definitions";

@Resolver(of => Author)
export default class AuthorResolver {
    @Query(() => [Author])
    async getAuthors() {
        return authors;
    }

    @Query(() => Author)
    async getAuthorById(@Arg("id") id: number) {
        return authors.find(a => a.id === id);
    }

    @Mutation(() => String)
    async login(@Args() { email }: LoginArgs) {
        const user = authors.find(a => a.email === email);

        if (!user) throw new Error("User Not Found!");

        return email;
    }

    @FieldResolver(() => [Post])
    async posts(@Root() author: Author) {
        return posts.filter(a => a.author === author.id);
    }
}