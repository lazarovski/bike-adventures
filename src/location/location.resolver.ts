import { UseGuards } from '@nestjs/common';
import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { Location } from './location.entity';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { GetLocationsArgs } from './args/get-locations.args';
import { JwtAuthGuard } from '@src/auth/guard/jwt.guard';

@Resolver(() => Location)
export class LocationResolver {
  constructor(private locationService: LocationService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Location], { name: 'getLocations' })
  async getLocations(@Args() args: GetLocationsArgs) {
    return this.locationService.getLocations(args);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Location, { name: 'createLocation' })
  async createLocation(@Args('input') data: CreateLocationDto) {
    return await this.locationService.createLocation(data);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Location, { name: 'updateLocation' })
  async updateLocation(@Args('input') data: UpdateLocationDto) {
    return await this.locationService.updateLocation(data);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Location, { name: 'deleteLocation' })
  async deleteLocation(@Args('id', { type: () => String }) id: string) {
    return await this.locationService.deleteLocation(id);
  }
}
