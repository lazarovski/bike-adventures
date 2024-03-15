import { Injectable } from '@nestjs/common';
import { Prisma, Location } from '@prisma/client';
import { PrismaService } from '@src/db/prisma.service';

@Injectable()
export class LocationRepository {
  constructor(private prisma: PrismaService) {}

  async getLocation(params: {
    where: Prisma.LocationWhereUniqueInput;
  }): Promise<Location | null> {
    const { where } = params;
    return await this.prisma.location.findUnique({ where });
  }

  async getLocations(params: {
    skip?: number;
    take?: number;
    where?: Prisma.LocationWhereInput;
    orderBy?: Prisma.LocationOrderByWithRelationInput;
  }): Promise<Location[]> {
    const { skip, take, where, orderBy } = params;
    return await this.prisma.location.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async createLocation(params: {
    data: Prisma.LocationUncheckedCreateInput;
  }): Promise<Location> {
    const { data } = params;
    return await this.prisma.location.create({ data });
  }

  async updateLocation(params: {
    where: Prisma.LocationWhereUniqueInput;
    data: Prisma.LocationUpdateInput;
  }): Promise<Location> {
    const { where, data } = params;
    return await this.prisma.location.update({ where, data });
  }

  async deleteLocation(params: {
    where: Prisma.LocationWhereUniqueInput;
  }): Promise<Location> {
    const { where } = params;
    return await this.prisma.location.delete({ where });
  }
}
