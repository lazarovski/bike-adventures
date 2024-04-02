import {
  Args,
  Query,
  Mutation,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Route } from './route.entity';
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { GetRoutesArgs } from './args/get-routes.args';
import { Activity } from '@src/activity/activity.entitiy';
import { ActivityService } from '@src/activity/activity.service';
import { Location } from '@src/location/location.entity';
import { LocationService } from '@src/location/location.service';
import { JwtAuthGuard } from '@src/auth/guard/jwt.guard';

@Resolver(() => Route)
export class RouteResolver {
  constructor(
    private routeService: RouteService,
    private activityService: ActivityService,
    private locationService: LocationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Route], { name: 'getRoutes' })
  async getRoutes(@Args() args: GetRoutesArgs) {
    return this.routeService.getRoutes(args);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Route, { name: 'createRoute' })
  async createRoute(@Args('input') data: CreateRouteDto) {
    return await this.routeService.createRoute(data);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Route, { name: 'updateRoute' })
  async updateRoute(@Args('input') data: UpdateRouteDto) {
    return await this.routeService.updateRoute(data);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Route, { name: 'deleteRoute' })
  async deleteRoute(@Args('id', { type: () => String }) id: string) {
    return await this.routeService.deleteRoute(id);
  }

  @ResolveField(() => Activity)
  async activity(@Parent() route: Route) {
    return this.activityService.getActivity(route.activityId ?? '');
  }

  @ResolveField(() => Location)
  async startLocation(@Parent() route: Route) {
    return this.locationService.getLocation(route.startLocationId);
  }

  @ResolveField(() => Location)
  async endLocation(@Parent() route: Route) {
    return this.locationService.getLocation(route.startLocationId);
  }
}
