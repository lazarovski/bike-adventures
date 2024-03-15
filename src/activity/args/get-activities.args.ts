import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class GetActivitiesArgs {
  @Field(() => String)
  @IsString()
  name?: string;

  @Field(() => String)
  @IsString()
  description?: string;

  @Field(() => String)
  @IsString()
  accountId?: string;

  @Field(() => Boolean, { defaultValue: true })
  published?: boolean;
}
