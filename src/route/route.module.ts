import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '@src/db/prisma.module';
import { RouteRepository } from './route.repository';
import { RouteService } from './route.service';
import { RouteResolver } from './route.resolver';
import { ActivityModule } from '@src/activity/activity.module';
import { LocationModule } from '@src/location/location.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => ActivityModule),
    forwardRef(() => LocationModule),
  ],
  providers: [RouteResolver, RouteRepository, RouteService],
  exports: [RouteResolver, RouteService],
})
export class RouteModule {}
