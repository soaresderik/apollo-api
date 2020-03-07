import { Field, ObjectType, ID } from "type-graphql";
import Author from "../author/author.entity";


@ObjectType()
export class Post {
    @Field(() => ID)
    id: number;

    @Field()
    title: string;

    @Field()
    description: string;

    @Field(() => Author)
    author: Author;
}