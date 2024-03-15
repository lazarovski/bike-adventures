import { Field, InputType, ID } from '@nestjs/graphql';
import { CreateActivityDto } from './create-activity.dto';

@InputType()
export class UpdateActivityDto extends CreateActivityDto {
  @Field(() => ID)
  id: string;
}
