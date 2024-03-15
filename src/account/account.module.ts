import { Module, forwardRef } from '@nestjs/common';
import { Account } from './account.entitiy';
import { AccountRepository } from './account.repository';
import { AccountService } from './account.services';
import { AccountResolver } from './account.resolver';
import { ActivityModule } from '@src/activity/activity.module';
import { PrismaModule } from '@src/db/prisma.module';

@Module({
  imports: [PrismaModule, forwardRef(() => ActivityModule)],
  providers: [Account, AccountRepository, AccountService, AccountResolver],
  exports: [Account, AccountService, AccountResolver],
})
export class AccountModule {}
