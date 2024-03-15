import { Injectable } from '@nestjs/common';
import { Activity } from './activity.entitiy';
import { ActivityRepository } from './activity.repository';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { GetActivitiesArgs } from './args/get-activities.args';

@Injectable()
export class ActivityService {
  constructor(private activityRepository: ActivityRepository) {}

  async getActivity(id: string): Promise<Activity | null> {
    return this.activityRepository.getActivity({ where: { id } });
  }

  async getActivities(args: GetActivitiesArgs): Promise<Activity[]> {
    return this.activityRepository.getActivities({
      where: { ...args },
    });
  }

  async createActivity(
    accountId: string,
    data: CreateActivityDto,
  ): Promise<Activity> {
    return this.activityRepository.createActivity({
      data: {
        ...data,
        accountId,
      },
    });
  }

  async updateActivity(data: UpdateActivityDto): Promise<Activity> {
    return this.activityRepository.updateActivity({
      where: { id: data.id },
      data,
    });
  }

  async deleteActivity(id: string): Promise<Activity> {
    return this.activityRepository.deleteActivity({ where: { id } });
  }
}
