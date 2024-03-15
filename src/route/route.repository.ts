import { Injectable } from '@nestjs/common';
import { Prisma, Route } from '@prisma/client';
import { PrismaService } from '@src/db/prisma.service';

@Injectable()
export class RouteRepository {
  constructor(private prisma: PrismaService) {}

  async getRoute(params: {
    where: Prisma.RouteWhereUniqueInput;
  }): Promise<Route | null> {
    const { where } = params;
    return await this.prisma.route.findUnique({ where });
  }

  async getRoutes(params: {
    skip?: number;
    take?: number;
    where?: Prisma.RouteWhereInput;
    orderBy?: Prisma.RouteOrderByWithRelationInput;
  }): Promise<Route[]> {
    const { skip, take, where, orderBy } = params;
    return await this.prisma.route.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async createRoute(params: {
    data: Prisma.RouteUncheckedCreateInput;
  }): Promise<Route> {
    const { data } = params;
    return await this.prisma.route.create({ data });
  }

  async updateRoute(params: {
    where: Prisma.RouteWhereUniqueInput;
    data: Prisma.RouteUpdateInput;
  }): Promise<Route> {
    const { where, data } = params;
    return await this.prisma.route.update({ where, data });
  }

  async deleteRoute(params: {
    where: Prisma.RouteWhereUniqueInput;
  }): Promise<Route> {
    const { where } = params;
    return await this.prisma.route.delete({ where });
  }
}
