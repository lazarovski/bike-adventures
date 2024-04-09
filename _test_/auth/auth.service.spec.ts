import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '@src/auth/auth.service';
import { AccountService } from '@src/account/account.service';
import { AccountModule } from '@src/account/account.module';
import { JwtModule } from '@nestjs/jwt';
import {
  mockUserCredentials,
  mockUserInfo,
  mockAccount,
  mockUser,
} from '@test/_mocks/entity';

describe('Test AuthServivce', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let accountService: AccountService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AccountModule, JwtModule],
      providers: [AuthService],
    }).compile();

    authService = app.get<AuthService>(AuthService);
    jwtService = app.get<JwtService>(JwtService);
    accountService = app.get<AccountService>(AccountService);
  });

  it('login: should return user info and token if usermockAccount exist', async () => {
    // given
    jest.spyOn(jwtService, 'sign').mockReturnValueOnce('token_test');

    // when
    const result = await authService.login(mockUser);

    // then
    expect(jwtService.sign).toHaveBeenCalled();
    expect(jwtService.sign).toHaveBeenCalledWith({
      userId: mockUser.id,
      email: mockUser.email,
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
    });
    expect(result).toEqual(mockUserInfo);
  });

  it('register: should return user info without password prop', async () => {
    // given
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...restResult } = mockAccount;
    jest
      .spyOn(accountService, 'creteAccount')
      .mockResolvedValueOnce(mockAccount);

    // when
    const result = await authService.register(mockUserCredentials);

    //then
    expect(accountService.creteAccount).toHaveBeenCalled();
    expect(accountService.creteAccount).toHaveBeenCalledWith(
      mockUserCredentials,
    );
    expect(result).toEqual(restResult);
  });
});
