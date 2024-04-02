import { Field, ObjectType, Float } from '@nestjs/graphql';
import { Location as Entity } from '@prisma/client';
import { BaseEntity } from '@src/base/base.entity';

@ObjectType()
export class Location extends BaseEntity {
  @Field(() => String)
  name: Entity['name'];

  @Field(() => String)
  description: Entity['description'];

  @Field(() => Float)
  latitude?: Entity['latitude'];

  @Field(() => Float)
  longitude?: Entity['longitude'];
}
