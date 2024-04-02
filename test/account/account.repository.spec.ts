import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@src/db/prisma.service';
import { AccountRepository } from '@src/account/account.repository';
import { AccountModule } from '@src/account/account.module';
import { mockUser, mockAccount } from '@test/_mocks/entity';

const mockGetAccount = jest.fn();

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        account: {
          findUnique: mockGetAccount,
        },
      };
    }),
  };
});

describe('Test AccountRepository', () => {
  let prismaService: PrismaService;
  let accountRepository: AccountRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AccountModule],
    }).compile();

    prismaService = app.get<PrismaService>(PrismaService);
    accountRepository = app.get<AccountRepository>(AccountRepository);
  });

  it('getAccount: should return account entity', async () => {
    // given
    mockGetAccount.mockReturnValueOnce(mockAccount);

    // then
    const result = await accountRepository.getAccount({
      where: {
        email: mockUser.email,
      },
    });
    expect(prismaService.account.findUnique).toHaveBeenCalled();
    expect(result).toEqual(mockAccount);
  });

  // it('createAccount: should return account', async () => {
  //   // when
  //   jest
  //     .spyOn(accountService, 'creteAccount')
  //     .mockResolvedValueOnce(mockAccount);

  //   // then
  //   const result = await accountService.creteAccount(mockUserCredentials);
  //   expect(result).toEqual(mockAccount);
  // });

  //   it('exclude: should return account entity without password prop and email', async () => {
  //     // given
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     const { password, email, ...restResult } = mockAccount;

  //     // then
  //     const result = await accountService.exclude(mockAccount, [
  //       'password',
  //       'email',
  //     ]);
  //     expect(result).toEqual(restResult);
  //   });
});
