import { CreateUserDto } from './createUserDto';

/**
 * DTO for user sign-up
 * Extends CreateUserDto with all its fields (email, password, and optional name)
 */
export interface SignUpDto extends CreateUserDto {}

