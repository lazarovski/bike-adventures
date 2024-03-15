import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateAccountDto {
  @Field(() => String)
  @IsString()
  firstName?: string;

  @Field(() => String)
  @IsString()
  lastName?: string;
}
