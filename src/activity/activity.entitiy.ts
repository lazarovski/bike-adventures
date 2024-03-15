import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Activity as Entity } from '@prisma/client';
import { Account } from '@src/account/account.entitiy';

@ObjectType()
export class Activity {
  @Field(() => ID)
  id: Entity['id'];

  @Field(() => String)
  name: Entity['name'];

  @Field(() => String)
  description: Entity['description'];

  @Field(() => Date)
  startDate: Entity['startDate'];

  @Field(() => String)
  accountId: Entity['accountId'];

  @Field(() => Account)
  account?: Account;

  @Field(() => [Account], { nullable: true })
  participants?: Account[];
}
