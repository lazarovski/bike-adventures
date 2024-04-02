import { Field, ObjectType, Float, Int } from '@nestjs/graphql';
import { Route as Entity } from '@prisma/client';
import { BaseEntity } from '@src/base/base.entity';

@ObjectType()
export class Route extends BaseEntity {
  @Field(() => String)
  name: Entity['name'];

  @Field(() => String)
  description: Entity['description'];

  @Field(() => Int)
  duration: Entity['duration'];

  @Field(() => Float)
  distanceInKm: Entity['distanceInKm'];

  @Field(() => [String])
  images: Entity['images'];

  @Field(() => String)
  activityId: Entity['activityId'];

  @Field(() => String)
  startLocationId: Entity['startLocationId'];

  @Field(() => String)
  endLocationId: Entity['endLocationId'];
}
