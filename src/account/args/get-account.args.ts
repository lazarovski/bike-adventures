import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsEmail } from 'class-validator';

@ArgsType()
export class GetAccountArgs {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => Boolean, { defaultValue: true })
  @IsBoolean()
  isActive?: boolean;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean()
  isDisabled?: boolean;
}
