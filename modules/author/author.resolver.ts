import { Resolver, Query, Arg, Root, FieldResolver } from "type-graphql";
import Author from "./author.entity";
import authors from "./author.service";
import posts from "../posts/post.service";
import { Post } from "../posts/post.entity";

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

    @FieldResolver(() => [Post])
    async posts(@Root() author: Author) {
        return posts.filter(a => a.author === author.id);
    }
}