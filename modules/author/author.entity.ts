import { Field, ID, ObjectType } from "type-graphql";
import { Post } from "../posts/post.entity";

@ObjectType()
export default class Author {
    @Field(() => ID)
    id: number;

    @Field()
    name: string;

    @Field(() => [Post])
    posts: Post[];
}