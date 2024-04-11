import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '@src/account/account.service';
import { AccountRepository } from '@src/account/account.repository';
import { AccountModule } from '@src/account/account.module';
import {
  mockUserCredentials,
  mockUser,
  mockAccount,
} from '@test/_mocks/entity';

describe('Test AccountService', () => {
  let accountService: AccountService;
  let accountRepository: AccountRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AccountModule],
    }).compile();

    accountService = app.get<AccountService>(AccountService);
    accountRepository = app.get<AccountRepository>(AccountRepository);
  });

  it('getAccount: should return account', async () => {
    // given
    jest
      .spyOn(accountRepository, 'getAccount')
      .mockResolvedValueOnce(mockAccount);

    // when
    const result = await accountService.getAccount({ email: mockUser.email });

    // then
    expect(accountRepository.getAccount).toHaveBeenCalled();
    expect(accountRepository.getAccount).toHaveBeenCalledWith({
      where: { email: mockUser.email },
    });
    expect(result).toEqual(mockAccount);
  });

  it('createAccount: should return created account', async () => {
    // given
    jest
      .spyOn(accountRepository, 'creteAccount')
      .mockResolvedValueOnce(mockAccount);

    // when
    const result = await accountService.creteAccount(mockUserCredentials);

    // then
    expect(accountRepository.creteAccount).toHaveBeenCalled();
    expect(accountRepository.creteAccount).toHaveBeenCalledWith({
      data: mockUserCredentials,
    });
    expect(result).toEqual(mockAccount);
  });

  it('exclude: should return account entity without password prop and email', async () => {
    // given
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, email, ...restResult } = mockAccount;

    // when
    const result = await accountService.exclude(mockAccount, [
      'password',
      'email',
    ]);

    //then
    expect(result).toEqual(restResult);
  });
});
