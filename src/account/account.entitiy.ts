import { Field, ObjectType } from '@nestjs/graphql';
import { Account as Entity } from '@prisma/client';
import { Activity } from '@src/activity/activity.entitiy';
import { BaseEntity } from '@src/base/base.entity';

@ObjectType()
export class Account extends BaseEntity {
  @Field(() => String)
  firstName: Entity['firstName'];

  @Field(() => String)
  lastName: Entity['lastName'];

  @Field(() => String)
  email: Entity['email'];

  @Field(() => [String])
  role: Entity['role'];

  @Field(() => String)
  initials?: string;

  @Field(() => [Activity])
  activities?: Activity[];
}
