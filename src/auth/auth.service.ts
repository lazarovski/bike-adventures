import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Account } from '@src/account/account.entitiy';
import { AccountService } from '@src/account/account.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => AccountService))
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  login(user: Account): LoginDto {
    return {
      token: this.jwtService.sign({
        userId: user.id,
        email: user.email,
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? '',
      }),
      user,
    };
  }

  async register(user: RegisterDto): Promise<Account> {
    const account = await this.accountService.creteAccount(user);
    return this.accountService.exclude(account, ['password']);
  }
}
