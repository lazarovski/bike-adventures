import { Test, TestingModule } from '@nestjs/testing';
import { AccountResolver } from '@src/account/account.resolver';
import { AccountService } from '@src/account/account.service';
import { ActivityModule } from '@src/activity/activity.module';
import { AccountModule } from '@src/account/account.module';
import {
  mockUserCredentials,
  mockUser,
  mockAccount,
} from '@test/_mocks/entity';

describe('Test AccountResolver', () => {
  let accountResolver: AccountResolver;
  let accountService: AccountService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AccountModule, ActivityModule],
      providers: [AccountResolver],
    }).compile();

    accountService = app.get<AccountService>(AccountService);
    accountResolver = app.get<AccountResolver>(AccountResolver);
  });

  it('getAccount: should return account entity', async () => {
    // given
    jest.spyOn(accountService, 'getAccount').mockResolvedValueOnce(mockAccount);

    // when
    const result = await accountResolver.getAccount({ email: mockUser.email });

    // then
    expect(accountService.getAccount).toHaveBeenCalled();
    expect(result).toEqual(mockAccount);
  });

  it('getAccount: should return null if there is no account', async () => {
    // given
    jest.spyOn(accountService, 'getAccount').mockResolvedValueOnce(null);

    // when
    const result = await accountResolver.getAccount({ email: mockUser.email });

    // then
    expect(accountService.getAccount).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('createAccount: should return account', async () => {
    // given
    jest
      .spyOn(accountService, 'creteAccount')
      .mockResolvedValueOnce(mockAccount);

    // when
    const result = await accountResolver.creteAccount(mockUserCredentials);

    // then
    expect(accountService.creteAccount).toHaveBeenCalled();
    expect(result).toEqual(mockAccount);
  });
});
