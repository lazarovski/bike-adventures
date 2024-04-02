import {
  Controller,
  Get,
  Req,
  Post,
  UseGuards,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Account } from '@src/account/account.entitiy';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard, JwtAuthGuard } from './guard';
import { LoginDto } from './dto';
import { EMAIL_EXIST } from '@src/config/constants';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get Account Session' })
  @ApiResponse({
    status: 200,
    description: 'Account session info',
  })
  async me(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiParam({ name: 'email', description: 'user email', required: true })
  @ApiParam({ name: 'password', description: 'user password', required: true })
  @ApiResponse({
    status: 200,
    description: 'Login using email and password',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  login(@Req() req: Request): LoginDto {
    try {
      return this.authService.login(req.user as Account);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiParam({ name: 'email', description: 'user email', required: true })
  @ApiParam({ name: 'password', description: 'user password', required: true })
  @ApiResponse({
    status: 200,
    description: 'Create Account',
    type: Account,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict',
  })
  async register(@Req() req: Request): Promise<Account> {
    try {
      return await this.authService.register(req.body);
    } catch (error) {
      throw new ConflictException(EMAIL_EXIST);
    }
  }
}
