import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../enum/roles.enum';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
export const IsAdmin = () => Roles(UserRole.Admin);
export const IsUser = () => SetMetadata(ROLES_KEY, [UserRole.User]);
export const IsAuthenticated = () => SetMetadata(ROLES_KEY, [UserRole.User, UserRole.Admin]);
