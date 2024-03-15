import { Field, ObjectType, ID, Float, Int } from '@nestjs/graphql';
import { Route as Entity } from '@prisma/client';

@ObjectType()
export class Route {
  @Field(() => ID)
  id: Entity['id'];

  @Field(() => String)
  name: Entity['name'];

  @Field(() => String)
  description: Entity['description'];

  @Field(() => Int)
  duration: Entity['duration'];

  @Field(() => Float)
  distanceInKm: Entity['distanceInKm'];

  @Field(() => String)
  activityId: Entity['activityId'];

  @Field(() => String)
  startLocationId: Entity['startLocationId'];

  @Field(() => String)
  endLocationId: Entity['endLocationId'];
}
