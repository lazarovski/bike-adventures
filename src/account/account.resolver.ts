import {
  Args,
  Query,
  Mutation,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { Account } from './account.entitiy';
import { GetAccountArgs } from './args/get-account.args';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountService } from './account.service';
import { Activity } from '@src/activity/activity.entitiy';
import { ActivityService } from '@src/activity/activity.service';
import { AdminGuard } from '@src/auth/guard/';

@ApiTags('Account')
@Resolver(() => Account)
export class AccountResolver {
  constructor(
    private accountService: AccountService,
    private activityService: ActivityService,
  ) {}

  @UseGuards(AdminGuard)
  @Query(() => Account, { name: 'getAccount', nullable: true })
  async getAccount(@Args() data: GetAccountArgs): Promise<Account | null> {
    return await this.accountService.getAccount(data);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Account, { name: 'creteAccount' })
  async creteAccount(@Args('input') data: CreateAccountDto): Promise<Account> {
    return await this.accountService.creteAccount(data);
  }

  @ResolveField()
  initials(@Parent() account: Account): string {
    return account.firstName && account.lastName
      ? `${account.firstName.charAt(0)} ${account.lastName.charAt(0)}`
      : '';
  }

  @ResolveField()
  async activities(@Parent() account: Account): Promise<Activity[]> {
    return await this.activityService.getActivities({ accountId: account.id });
  }
}
