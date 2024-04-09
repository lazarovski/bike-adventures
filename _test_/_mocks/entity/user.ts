import { Account } from '@src/account/account.entitiy';

export const mockUser: Account = {
  id: '1',
  email: 'test@test.com',
  firstName: 'Test first name',
  lastName: 'Test last name',
  role: ['USER'],
};

export const mockAccount = {
  ...mockUser,
  password: '12345',
  isActive: true,
  isDisabled: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockUserCredentials = {
  email: mockUser.email,
  password: '123456789',
};

export const mockUserInfo = {
  token: 'token_test',
  user: mockUser,
};
