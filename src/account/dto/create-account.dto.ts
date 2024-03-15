import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

@InputType()
export class CreateAccountDto {
  @Field(() => String)
  @IsString()
  @MaxLength(50)
  firstName?: string;

  @Field(() => String)
  @IsString()
  @MaxLength(50)
  lastName?: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  @MinLength(8)
  password: string;
}
