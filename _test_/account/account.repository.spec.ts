import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@src/db/prisma.service';
import { AccountRepository } from '@src/account/account.repository';
import { AccountModule } from '@src/account/account.module';
import {
  mockUser,
  mockAccount,
  mockUserCredentials,
} from '@test/_mocks/entity';

const SAMPLE_QUERY = {
  where: {
    email: mockUser.email,
  },
};
const SAMPLE_HASH = 'password_hash';

const mockGetAccount = jest.fn();
const mockCreateAccount = jest.fn();

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        account: {
          findUnique: mockGetAccount,
          create: mockCreateAccount,
        },
      };
    }),
  };
});

jest.mock('bcrypt', () => {
  return {
    hash: jest.fn().mockImplementation(() => SAMPLE_HASH),
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getAccount: should return account', async () => {
    // given
    mockGetAccount.mockReturnValueOnce(mockAccount);

    // when
    const result = await accountRepository.getAccount(SAMPLE_QUERY);

    // then
    expect(prismaService.account.findUnique).toHaveBeenCalled();
    expect(prismaService.account.findUnique).toHaveBeenCalledWith(SAMPLE_QUERY);
    expect(result).toEqual(mockAccount);
  });

  it('getAccount: should return null if there is no account', async () => {
    // given
    mockGetAccount.mockReturnValueOnce(null);

    // when
    const result = await accountRepository.getAccount(SAMPLE_QUERY);
    // then
    expect(prismaService.account.findUnique).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('createAccount: should return account', async () => {
    // given
    mockCreateAccount.mockReturnValueOnce(mockAccount);

    // when
    const result = await accountRepository.creteAccount({
      data: mockUserCredentials,
    });

    // then
    expect(prismaService.account.create).toHaveBeenCalled();
    expect(prismaService.account.create).toHaveBeenCalledWith({
      data: {
        email: mockUserCredentials.email,
        password: SAMPLE_HASH,
      },
    });
    expect(result).toEqual(mockAccount);
  });
});
