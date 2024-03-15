import { Injectable, ConflictException } from '@nestjs/common';
import { Prisma, Account } from '@prisma/client';
import { PrismaService } from '@src/db/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountRepository {
  constructor(private prisma: PrismaService) {}

  async getAccount(params: {
    where: Prisma.AccountWhereUniqueInput;
  }): Promise<Account | null> {
    const { where } = params;
    return await this.prisma.account.findUnique({ where });
  }

  async creteAccount(params: {
    data: Prisma.AccountUncheckedCreateInput;
  }): Promise<Account> {
    const { data } = params;
    const account = await this.prisma.account.findUnique({
      where: {
        email: data.email,
      },
    });

    if (account) {
      throw new ConflictException('Email address is already taken.');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    return await this.prisma.account.create({
      data: { ...data, password: passwordHash },
    });
  }
}
