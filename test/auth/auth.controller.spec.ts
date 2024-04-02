import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { AuthController } from '@src/auth/auth.controller';
import { AuthService } from '@src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from '@src/account/account.module';
import {
  mockUserCredentials,
  mockUserInfo,
  mockUser,
} from '@test/_mocks/entity';

const mockRequest = {
  body: mockUserCredentials,
} as Request;

describe('Test AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AccountModule, JwtModule],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authService = app.get<AuthService>(AuthService);
    authController = app.get<AuthController>(AuthController);
  });

  it('login: should return user info and token if user exist', async () => {
    // given
    jest.spyOn(authService, 'login').mockReturnValueOnce(mockUserInfo);

    // when
    const result = await authController.login(mockRequest);

    // then
    expect(authService.login).toHaveBeenCalled();
    expect(result).toEqual(mockUserInfo);
  });

  it('login: should throw an error if user doesnt exist', async () => {
    // given
    jest.spyOn(authService, 'login').mockImplementationOnce(() => {
      throw new Error();
    });

    // then
    try {
      await authController.login(mockRequest);
    } catch (error) {
      expect(authService.login).toHaveBeenCalled();
      expect(error.message).toBe('Not Found');
    }
  });

  it('register: should return user info', async () => {
    // given
    jest.spyOn(authService, 'register').mockResolvedValueOnce(mockUser);

    // when
    const result = await authController.register(mockRequest);

    // then
    expect(authService.register).toHaveBeenCalled();
    expect(result).toEqual(mockUser);
  });

  it('register: should throw an error if user exist', async () => {
    // given
    jest.spyOn(authService, 'register').mockImplementationOnce(() => {
      throw new Error();
    });

    // then
    try {
      await authController.register(mockRequest);
    } catch (error) {
      expect(authService.register).toHaveBeenCalled();
      expect(error.message).toBe('Email address is already taken.');
    }
  });
});
