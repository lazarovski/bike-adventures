import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { AccountRepository } from './account.repository';
import { CreateAccountDto } from './dto/create-account.dto';
import { GetAccountArgs } from './args/get-account.args';

@Injectable()
export class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  exclude<Key extends keyof Account>(user: Account, keys: Key[]) {
    const entries = Object.entries(user).filter(
      ([key]: [Key, string]) => !keys.includes(key),
    );
    return Object.fromEntries(entries) as Omit<Account, Key>;
  }

  async getAccount(args: GetAccountArgs): Promise<Account | null> {
    const account = await this.accountRepository.getAccount({
      where: { ...args },
    });

    return account;
  }

  async creteAccount(data: CreateAccountDto): Promise<Account> {
    const account = await this.accountRepository.creteAccount({ data });
    return account;
  }
}
