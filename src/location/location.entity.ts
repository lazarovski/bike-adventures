import { Field, ObjectType, ID, Float } from '@nestjs/graphql';
import { Location as Entity } from '@prisma/client';

@ObjectType()
export class Location {
  @Field(() => ID)
  id: Entity['id'];

  @Field(() => String)
  name: Entity['name'];

  @Field(() => String)
  description: Entity['description'];

  @Field(() => Float)
  latitude?: Entity['latitude'];

  @Field(() => Float)
  longitude?: Entity['longitude'];
}
