import { Controller, Get, Req, Post, UseGuards } from '@nestjs/common';
import { Account } from '@src/account/account.entitiy';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.guard';
import { JwtAuthGuard } from './guard/jwt.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: Request) {
    console.log('user', req.user);
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request): Promise<LoginDto> {
    return await this.authService.login(req.user as Account);
  }

  @Post('register')
  async register(@Req() req: Request): Promise<Account> {
    return await this.authService.register(req.body);
  }
}
