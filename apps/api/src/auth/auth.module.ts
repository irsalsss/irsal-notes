import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController, EXPIRATION_TIME } from './auth.controller';
import { AuthHelperService } from './auth-helper.service';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      // Setting global: true makes JwtModule available globally across the app
      // So you don't need to import it in every module that uses JWT.
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: EXPIRATION_TIME },
    }),
  ],
  providers: [AuthService, AuthHelperService],
  controllers: [AuthController],
  exports: [AuthService, AuthHelperService],
})
export class AuthModule {}
