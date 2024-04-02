// import { Injectable } from '@nestjs/common';
// import { Prisma } from '@prisma/client';

// interface IRepository<T> {
//   getOne(params: { where: Prisma.AccountWhereUniqueInput }): Promise<T | null>;
//   getAll(): Promise<T[]>;
//   create(data: Partial<T>): Promise<T>;
//   update(id: number, data: Partial<T>): Promise<T | null>;
//   delete(id: number): Promise<T | null>;
// }

// @Injectable()
// export class BaseService<T> {
//   constructor(private repository: IRepository<T>) {}

//   async getOne(id: string): Promise<T | null> {
//     return this.repository.getOne({ where });
//   }

//   //   async getActivities(args: GetActivitiesArgs): Promise<Activity[]> {
//   //     return this.activityRepository.getActivities({
//   //       where: { ...args },
//   //     });
//   //   }

//   //   async createActivity(
//   //     accountId: string,
//   //     data: CreateActivityDto,
//   //   ): Promise<Activity> {
//   //     return this.activityRepository.createActivity({
//   //       data: {
//   //         ...data,
//   //         accountId,
//   //       },
//   //     });
//   //   }

//   //   async updateActivity(data: UpdateActivityDto): Promise<Activity> {
//   //     return this.activityRepository.updateActivity({
//   //       where: { id: data.id },
//   //       data,
//   //     });
//   //   }

//   //   async deleteActivity(id: string): Promise<Activity> {
//   //     return this.activityRepository.deleteActivity({ where: { id } });
//   //   }
// }
