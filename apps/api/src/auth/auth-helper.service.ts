import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';

@Injectable()
export class AuthHelperService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Optionally extracts user ID from request if authenticated.
   * Returns undefined if no valid token is found (does not throw).
   * Useful for endpoints that work both with and without authentication.
   *
   * @param req - Express request object or any object with cookies and headers
   * @returns User ID as number if authenticated, undefined otherwise
   */
  async getOptionalUserId(
    req:
      | Request
      | {
          cookies?: { access_token?: string };
          headers?: { authorization?: string };
        },
  ): Promise<number | undefined> {
    try {
      const token =
        req.cookies?.access_token || req.headers?.authorization?.split(' ')[1];
      if (!token) return undefined;

      const payload = await this.jwtService.verifyAsync<{ sub: string }>(
        token,
        {
          secret: jwtConstants.secret,
        },
      );
      return parseInt(payload.sub);
    } catch {
      return undefined;
    }
  }

  /**
   * Extracts the full user payload from request if authenticated.
   * Returns undefined if no valid token is found (does not throw).
   *
   * @param req - Express request object or any object with cookies and headers
   * @returns User payload if authenticated, undefined otherwise
   */
  async getOptionalUser(
    req:
      | Request
      | {
          cookies?: { access_token?: string };
          headers?: { authorization?: string };
        },
  ): Promise<
    { sub: string; email: string; iat?: number; exp?: number } | undefined
  > {
    try {
      const token =
        req.cookies?.access_token || req.headers?.authorization?.split(' ')[1];
      if (!token) return undefined;

      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        email: string;
        iat?: number;
        exp?: number;
      }>(token, {
        secret: jwtConstants.secret,
      });
      return payload;
    } catch {
      return undefined;
    }
  }
}
