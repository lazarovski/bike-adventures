import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '@src/db/prisma.module';
import { ActivityRepository } from './activity.repository';
import { ActivityService } from './activity.services';
import { ActivityResolver } from './activity.resolver';
import { Activity } from './activity.entitiy';
import { AccountModule } from '@src/account/account.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AccountModule)],
  providers: [ActivityResolver, ActivityService, ActivityRepository, Activity],
  exports: [ActivityResolver, ActivityService, Activity],
})
export class ActivityModule {}
