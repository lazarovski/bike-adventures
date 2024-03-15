import { Account } from '@src/account/account.entitiy';

export class LoginDto {
  token: string;
  user: Account;
}
