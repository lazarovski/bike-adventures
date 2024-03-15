import { ArgsType, Field } from '@nestjs/graphql';
import { IsString, IsEmail, MinLength } from 'class-validator';

@ArgsType()
export class GetAccountArgs {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  @MinLength(8)
  password?: string;
}
