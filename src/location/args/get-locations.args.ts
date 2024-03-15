import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class GetLocationsArgs {
  @Field(() => String)
  @IsString()
  name?: string;

  @Field(() => String)
  @IsString()
  description?: string;
}
