import { Field, InputType, Float } from '@nestjs/graphql';
import { IsString, MaxLength, IsNumber } from 'class-validator';

const maxLengthMessage = 'is too long. Max length is $constraint1 characters.';

@InputType()
export class CreateLocationDto {
  @Field(() => String)
  @IsString()
  @MaxLength(200, { message: `Name ${maxLengthMessage}` })
  name: string;

  @Field(() => String)
  @IsString()
  @MaxLength(512, { message: `Description ${maxLengthMessage}` })
  description: string;

  @Field(() => Float)
  @IsNumber()
  latitude?: number;

  @Field(() => Float)
  @IsNumber()
  longitude?: number;
}
