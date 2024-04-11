import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@src/db/prisma.service';
import { ActivityRepository } from '@src/activity/activity.repository';
import { ActivityModule } from '@src/activity/activity.module';
import { mockActivity, mockNewActivity } from '@test/_mocks/entity';

const SAMPLE_QUERY = {
  where: { id: mockActivity.id },
};

const mockGetActivity = jest.fn();
const mockGetActivities = jest.fn();
const mockCreateActivity = jest.fn();
const mockUpdateActivity = jest.fn();
const mockDeleteActivity = jest.fn();

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        activity: {
          findUnique: mockGetActivity,
          findMany: mockGetActivities,
          create: mockCreateActivity,
          update: mockUpdateActivity,
          delete: mockDeleteActivity,
        },
      };
    }),
  };
});

describe('Test ActivityRepository', () => {
  let prismaService: PrismaService;
  let activityRepository: ActivityRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ActivityModule],
    }).compile();

    prismaService = app.get<PrismaService>(PrismaService);
    activityRepository = app.get<ActivityRepository>(ActivityRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getActivity: should return activity', async () => {
    // given
    mockGetActivity.mockReturnValueOnce(mockActivity);

    // when
    const result = await activityRepository.getActivity(SAMPLE_QUERY);

    // then
    expect(prismaService.activity.findUnique).toHaveBeenCalled();
    expect(prismaService.activity.findUnique).toHaveBeenCalledWith(
      SAMPLE_QUERY,
    );
    expect(result).toEqual(mockActivity);
  });

  it('getActivity: should return null if there is no activity', async () => {
    // given
    mockGetActivity.mockReturnValueOnce(null);

    // when
    const result = await activityRepository.getActivity(SAMPLE_QUERY);
    // then
    expect(prismaService.activity.findUnique).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('getActivities: should return activities', async () => {
    // given
    const mockParams = { where: { ...SAMPLE_QUERY.where, take: 5, skip: 5 } };
    mockGetActivities.mockReturnValueOnce([mockActivity]);

    // when
    const result = await activityRepository.getActivities(mockParams);

    // then
    expect(prismaService.activity.findMany).toHaveBeenCalled();
    expect(prismaService.activity.findMany).toHaveBeenCalledWith(mockParams);
    expect(result).toEqual([mockActivity]);
  });

  it('createActivity: should return created activity', async () => {
    // given
    mockCreateActivity.mockReturnValueOnce(mockActivity);

    // when
    const result = await activityRepository.createActivity({
      data: mockNewActivity,
    });

    // then
    expect(prismaService.activity.create).toHaveBeenCalled();
    expect(prismaService.activity.create).toHaveBeenCalledWith({
      data: mockNewActivity,
    });
    expect(result).toEqual(mockActivity);
  });

  it('updateActivity: should return updated activity', async () => {
    // given
    const mockParams = {
      where: SAMPLE_QUERY.where,
      data: mockNewActivity,
    };
    mockUpdateActivity.mockReturnValueOnce(mockActivity);

    // when
    const result = await activityRepository.updateActivity(mockParams);

    // then
    expect(prismaService.activity.update).toHaveBeenCalled();
    expect(prismaService.activity.update).toHaveBeenCalledWith(mockParams);
    expect(result).toEqual(mockActivity);
  });

  it('deleteActivity: should return deleted activity', async () => {
    // given
    mockDeleteActivity.mockReturnValueOnce(mockActivity);

    // when
    const result = await activityRepository.deleteActivity(SAMPLE_QUERY);

    // then
    expect(prismaService.activity.delete).toHaveBeenCalled();
    expect(prismaService.activity.delete).toHaveBeenCalledWith(SAMPLE_QUERY);
    expect(result).toEqual(mockActivity);
  });
});
