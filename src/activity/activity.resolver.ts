import {
  Args,
  Query,
  Mutation,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Activity } from './activity.entitiy';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { GetActivitiesArgs } from './args/get-activities.args';
import { Account } from '@src/account/account.entitiy';
import { AccountService } from '@src/account/account.service';
import { JwtAuthGuard } from '@src/auth/guard/jwt.guard';

@Resolver(() => Activity)
export class ActivityResolver {
  constructor(
    private activityService: ActivityService,
    private accountService: AccountService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => Activity, { name: 'getActivity', nullable: true })
  async getActivity(@Args('id', { type: () => String }) id: string) {
    return await this.activityService.getActivity(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Activity], { name: 'getActivities' })
  async getActivities(@Args() args: GetActivitiesArgs) {
    return this.activityService.getActivities(args);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Activity, { name: 'createActivity' })
  async createActivity(@Args('input') data: CreateActivityDto) {
    data.startDate = new Date(data.startDate);
    return await this.activityService.createActivity(data);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Activity, { name: 'updateActivity' })
  async updateActivity(@Args('input') data: UpdateActivityDto) {
    return await this.activityService.updateActivity(data);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Activity, { name: 'deleteActivity' })
  async deleteActivity(@Args('id', { type: () => String }) id: string) {
    return await this.activityService.deleteActivity(id);
  }

  @ResolveField(() => Account)
  async account(@Parent() activity: Activity) {
    return this.accountService.getAccountById(activity.accountId);
  }
}
