import { Field, InputType, Float, Int } from '@nestjs/graphql';
import { IsString, MaxLength, IsNumber } from 'class-validator';

const maxLengthMessage = 'is too long. Max length is $constraint1 characters.';

@InputType()
export class CreateRouteDto {
  @Field(() => String)
  @IsString()
  @MaxLength(200, { message: `Name ${maxLengthMessage}` })
  name: string;

  @Field(() => String)
  @IsString()
  @MaxLength(1024, { message: `Description ${maxLengthMessage}` })
  description: string;

  @Field(() => Int)
  @IsNumber()
  duration: number;

  @Field(() => Float)
  @IsNumber()
  distanceInKm: number;

  @Field(() => String)
  @IsString()
  startLocationId: string;

  @Field(() => String)
  @IsString()
  endLocationId: string;

  @Field(() => String)
  @IsString()
  activityId?: string;
}
