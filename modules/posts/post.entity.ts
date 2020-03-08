import { Field, ObjectType, ID, Authorized } from "type-graphql";
import Author from "../author/author.entity";


@ObjectType()
export class Post {
    @Field(() => ID)
    id: number;

    @Field()
    title: string;

    @Field()
    @Authorized(["ADMIN"])
    description: string;

    @Field(() => Author)
    author: Author;
}