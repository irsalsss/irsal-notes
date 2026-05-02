import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const mockPrismaService = {
  user: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [{ id: 1, email: 'test@example.com' }];
      mockPrismaService.user.findMany.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(prisma.user.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = { id: 1, email: 'test@example.com' };
      mockPrismaService.user.findUnique.mockResolvedValue(user);

      const result = await service.findOne(1);
      expect(result).toEqual(user);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        select: expect.any(Object),
      });
    });
  });

  describe('findProfile', () => {
    it('should return a user profile by id', async () => {
      const profile = { id: 1, email: 'test@example.com', aboutMe: 'hello' };
      mockPrismaService.user.findUnique.mockResolvedValue(profile);

      const result = await service.findProfile(1);
      expect(result).toEqual(profile);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        select: expect.any(Object),
      });
    });
  });

  describe('create', () => {
    it('should create a new user with hashed password', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = 'hashedPassword';
      const newUser = { id: 1, email, name: 'Test' };

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockPrismaService.user.create.mockResolvedValue(newUser);

      const result = await service.create(email, password, 'Test');

      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email,
          password: hashedPassword,
          name: 'Test',
        },
        select: expect.any(Object),
      });
      expect(result).toEqual(newUser);
    });

    it('should throw ConflictException if email exists (P2002)', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');
      
      const prismaError = new PrismaClientKnownRequestError('Unique constraint failed', {
        code: 'P2002',
        clientVersion: '5.0.0',
      });
      
      mockPrismaService.user.create.mockRejectedValue(prismaError);
      
      await expect(service.create(email, password)).rejects.toThrow(ConflictException);
    });

    it('should throw InternalServerErrorException if table missing (P2021)', async () => {
      const prismaError = new PrismaClientKnownRequestError('Table missing', {
        code: 'P2021',
        clientVersion: '5.0.0',
      });
      mockPrismaService.user.create.mockRejectedValue(prismaError);
      await expect(service.create('a@b.com', 'p')).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw InternalServerErrorException if connection error (P5010 or P1001)', async () => {
      const error5010 = new PrismaClientKnownRequestError('Connection error', {
        code: 'P5010',
        clientVersion: '5.0.0',
      });
      mockPrismaService.user.create.mockRejectedValue(error5010);
      await expect(service.create('a@b.com', 'p')).rejects.toThrow(InternalServerErrorException);

      const error1001 = new PrismaClientKnownRequestError('Connection error', {
        code: 'P1001',
        clientVersion: '5.0.0',
      });
      mockPrismaService.user.create.mockRejectedValue(error1001);
      await expect(service.create('a@b.com', 'p')).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw InternalServerErrorException if auth failed (P1000)', async () => {
      const prismaError = new PrismaClientKnownRequestError('Auth failed', {
        code: 'P1000',
        clientVersion: '5.0.0',
      });
      mockPrismaService.user.create.mockRejectedValue(prismaError);
      await expect(service.create('a@b.com', 'p')).rejects.toThrow(InternalServerErrorException);
    });

    it('should re-throw unknown Prisma errors (unmatched code)', async () => {
      const prismaError = new PrismaClientKnownRequestError('Unknown code', {
        code: 'P9999',
        clientVersion: '5.0.0',
      });
      mockPrismaService.user.create.mockRejectedValue(prismaError);
      await expect(service.create('a@b.com', 'p')).rejects.toThrow(prismaError);
    });

    it('should re-throw unknown errors', async () => {
      const error = new Error('Unknown');
      mockPrismaService.user.create.mockRejectedValue(error);
      await expect(service.create('a@b.com', 'p')).rejects.toThrow('Unknown');
    });
  });

  describe('verifyPassword', () => {
    it('should verify password correctly', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      const result = await service.verifyPassword('plain', 'hashed');
      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith('plain', 'hashed');
    });
  });

  describe('findByEmail', () => {
    it('should find user by email', async () => {
      const email = 'test@example.com';
      const user = { id: 1, email, password: 'hashedPassword' };
      mockPrismaService.user.findUnique.mockResolvedValue(user);

      const result = await service.findByEmail(email);
      expect(result).toEqual(user);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
    });

    it('should return null if email is empty', async () => {
      const result = await service.findByEmail('');
      expect(result).toBeNull();
      expect(prisma.user.findUnique).not.toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException if table missing (P2021)', async () => {
      const prismaError = new PrismaClientKnownRequestError('Table missing', {
        code: 'P2021',
        clientVersion: '5.0.0',
      });
      mockPrismaService.user.findUnique.mockRejectedValue(prismaError);
      await expect(service.findByEmail('test@test.com')).rejects.toThrow(InternalServerErrorException);
    });

    it('should return null and log error for other errors', async () => {
      const error = new Error('Other');
      mockPrismaService.user.findUnique.mockRejectedValue(error);
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const result = await service.findByEmail('test@test.com');
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updatedUser = { id: 1, name: 'New Name' };
      mockPrismaService.user.update.mockResolvedValue(updatedUser);

      const result = await service.update(1, { name: 'New Name' });
      expect(result).toEqual(updatedUser);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { name: 'New Name' },
        select: expect.any(Object),
      });
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const deletedUser = { id: 1, email: 'deleted@test.com' };
      mockPrismaService.user.delete.mockResolvedValue(deletedUser);

      const result = await service.remove(1);
      expect(result).toEqual(deletedUser);
      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: 1 },
        select: expect.any(Object),
      });
    });
  });
});
