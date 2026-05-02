import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

const mockUsersService = {
  create: jest.fn(),
  findByEmail: jest.fn(),
  verifyPassword: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('should create a user and return an access token', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const user = { id: 1, email };
      const token = 'signed-jwt-token';

      mockUsersService.create.mockResolvedValue(user);
      mockJwtService.sign.mockReturnValue(token);

      const result = await service.signUp(email, password);

      expect(usersService.create).toHaveBeenCalledWith(email, password);
      expect(jwtService.sign).toHaveBeenCalledWith({ email: user.email, sub: user.id });
      expect(result).toEqual({ user, access_token: token });
    });
  });

  describe('signIn', () => {
    it('should return an access token for valid credentials', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const user = { id: 1, email, password: 'hashedPassword' };
      const token = 'signed-jwt-token';

      mockUsersService.findByEmail.mockResolvedValue(user);
      mockUsersService.verifyPassword.mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue(token);

      const result = await service.signIn(email, password);

      expect(usersService.findByEmail).toHaveBeenCalledWith(email);
      expect(usersService.verifyPassword).toHaveBeenCalledWith(password, user.password);
      expect(result).toEqual({ access_token: token });
    });

    it('should throw UnauthorizedException if user not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(service.signIn('wrong@example.com', 'password')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const user = { id: 1, email: 'test@example.com', password: 'hashedPassword' };
      mockUsersService.findByEmail.mockResolvedValue(user);
      mockUsersService.verifyPassword.mockResolvedValue(false);

      await expect(service.signIn('test@example.com', 'wrongpassword')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('validateUser', () => {
    it('should return user if found', async () => {
      const user = { id: 1, email: 'test@example.com' };
      mockUsersService.findByEmail.mockResolvedValue(user);

      const result = await service.validateUser('test@example.com');
      expect(result).toEqual(user);
    });

    it('should throw UnauthorizedException if user not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(service.validateUser('none@example.com')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
