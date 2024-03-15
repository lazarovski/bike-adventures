import { Field, InputType, ID } from '@nestjs/graphql';
import { CreateRouteDto } from './create-route.dto';

@InputType()
export class UpdateRouteDto extends CreateRouteDto {
  @Field(() => ID)
  id: string;
}
