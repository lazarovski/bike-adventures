import { Activity } from '@src/activity/activity.entitiy';

export const mockNewActivity = {
  name: 'Activity 1',
  description: 'Activity 1',
  startDate: new Date(),
  accountId: 'user_1',
};

export const mockActivity: Activity = {
  id: '1',
  ...mockNewActivity,
};
