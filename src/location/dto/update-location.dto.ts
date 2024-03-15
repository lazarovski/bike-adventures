import { Field, InputType, ID } from '@nestjs/graphql';
import { CreateLocationDto } from './create-location.dto';

@InputType()
export class UpdateLocationDto extends CreateLocationDto {
  @Field(() => ID)
  id: string;
}
