import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/db/prisma.module';
import { LocationRepository } from './location.respository';
import { LocationService } from './location.service';
import { LocationResolver } from './location.resolver';

@Module({
  imports: [PrismaModule],
  providers: [LocationResolver, LocationRepository, LocationService],
  exports: [LocationResolver, LocationService],
})
export class LocationModule {}
