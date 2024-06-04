import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, IsDate } from 'class-validator';

const maxLengthMessage = 'is too long. Max length is $constraint1 characters.';

@InputType()
export class CreateActivityDto {
  @Field(() => String)
  @IsString()
  @MaxLength(200, { message: `Name ${maxLengthMessage}` })
  name: string;

  @Field(() => String)
  @IsString()
  @MaxLength(1024, { message: `Description ${maxLengthMessage}` })
  description: string;

  @Field(() => Date)
  @IsDate()
  startDate: Date;

  @Field(() => String)
  @IsString()
  accountId: string;
}
