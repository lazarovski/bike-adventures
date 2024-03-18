import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Account as Entity } from '@prisma/client';
import { Activity } from '@src/activity/activity.entitiy';

@ObjectType()
export class Account {
  @Field(() => ID)
  id: Entity['id'];

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
