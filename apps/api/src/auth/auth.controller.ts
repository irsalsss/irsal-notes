import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { AuthGuard, RequestWithUser } from './auth.guard';
import { UsersService } from '../users/users.service';

export const EXPIRATION_TIME = 60 * 60 * 24 * 30 * 1000; // 30 days

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('sign_up')
  @ApiCreatedResponse({ type: User })
  async signUp(
    @Body() signUpDto: CreateUserDto,
    @Res({ passthrough: true }) response: any,
  ) {
    const result = await this.authService.signUp(
      signUpDto.email,
      signUpDto.password,
    );

    const isProduction = process.env.NODE_ENV === 'production';
    response.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: EXPIRATION_TIME,
    });

    return { message: 'Sign up successful' };
  }

  @Post('sign_in')
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({ type: User })
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: any,
  ) {
    const result = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    // Set httpOnly cookie with the access token
    const isProduction = process.env.NODE_ENV === 'production';
    response.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: EXPIRATION_TIME,
    });

    return { message: 'Sign in successful' };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOkResponse({ type: User })
  async getProfile(@Request() req: RequestWithUser) {
    const userId = parseInt(req.user.sub, 10);
    return this.usersService.findProfile(userId);
  }

  @Post('sign_out')
  @ApiOkResponse({ description: 'Sign out successful' })
  signOut(@Res({ passthrough: true }) response: any) {
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return { message: 'Sign out successful' };
  }
}
