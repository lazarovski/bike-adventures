import { Injectable } from '@nestjs/common';
import { Prisma, Activity } from '@prisma/client';
import { PrismaService } from '@src/db/prisma.service';

@Injectable()
export class ActivityRepository {
  constructor(private prisma: PrismaService) {}

  async getActivity(params: {
    where: Prisma.ActivityWhereUniqueInput;
  }): Promise<Activity | null> {
    const { where } = params;
    return await this.prisma.activity.findUnique({ where });
  }

  async getActivities(params: {
    skip?: number;
    take?: number;
    where?: Prisma.ActivityWhereInput;
    orderBy?: Prisma.ActivityOrderByWithRelationInput;
  }): Promise<Activity[]> {
    const { skip, take, where, orderBy } = params;
    return await this.prisma.activity.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async createActivity(params: {
    data: Prisma.ActivityUncheckedCreateInput;
  }): Promise<Activity> {
    const { data } = params;
    return await this.prisma.activity.create({ data });
  }

  async updateActivity(params: {
    where: Prisma.ActivityWhereUniqueInput;
    data: Prisma.ActivityUpdateInput;
  }): Promise<Activity> {
    const { where, data } = params;
    return await this.prisma.activity.update({ where, data });
  }

  async deleteActivity(params: {
    where: Prisma.ActivityWhereUniqueInput;
  }): Promise<Activity> {
    const { where } = params;
    return await this.prisma.activity.delete({ where });
  }
}
