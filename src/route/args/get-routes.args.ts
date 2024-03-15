import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class GetRoutesArgs {
  @Field(() => String)
  @IsString()
  name?: string;

  @Field(() => String)
  @IsString()
  description?: string;
}
