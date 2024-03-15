import { Injectable } from '@nestjs/common';
import { Route } from './route.entity';
import { RouteRepository } from './route.repository';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { GetRoutesArgs } from './args/get-routes.args';

@Injectable()
export class RouteService {
  constructor(private routeRepository: RouteRepository) {}

  async getRoutes(args: GetRoutesArgs): Promise<Route[]> {
    return this.routeRepository.getRoutes({
      where: { ...args },
    });
  }

  async createRoute(data: CreateRouteDto): Promise<Route> {
    return this.routeRepository.createRoute({ data });
  }

  async updateRoute(data: UpdateRouteDto): Promise<Route> {
    return this.routeRepository.updateRoute({
      where: { id: data.id },
      data,
    });
  }

  async deleteRoute(id: string): Promise<Route> {
    return this.routeRepository.deleteRoute({ where: { id } });
  }
}
