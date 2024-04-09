import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '@src/health/health.controller';

describe('Test HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
  });

  it('should return OK status', () => {
    expect(healthController.check()).toEqual({ status: 'ok' });
  });
});
