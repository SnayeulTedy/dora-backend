// src/guards/roles.guard.ts

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/role.decorator';
import { UserRole } from '../enum/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Récupère les rôles attendus sur la route
    const requiredRoles = this.reflector.get<UserRole[]>(ROLES_KEY, context.getHandler());

    // Si aucun rôle requis n'est défini → accès libre après authentification
    if (!requiredRoles) {
      return true;
    }

    // Récupère l'utilisateur depuis la requête
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('User:', user);
    // Vérifie si le rôle est présent
    if (!user || !user.role) {
      throw new ForbiddenException('Access denied. User role not found.');
    }

    // Vérifie que le rôle de l'utilisateur fait partie des rôles requis
    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      throw new ForbiddenException('Access denied. Insufficient permissions.');
    }

    return true;
  }
}
