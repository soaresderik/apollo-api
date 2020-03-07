import { Resolver, Query, FieldResolver, Args, Arg, Root } from "type-graphql";
import { Post } from "./post.entity";
import authors from "../author/author.service";
import posts from "./post.service";
import Author from "../author/author.entity";

@Resolver(of => Post)
export default class PostResolver {

    @Query(() => [Post])
    async allPosts() {
        return posts;
    }

    @FieldResolver(() => Author)
    async author(@Root() { author }) {
        return authors.find(a => a.id === author);
    }
}