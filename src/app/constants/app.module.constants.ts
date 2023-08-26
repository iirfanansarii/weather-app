import { AppController } from '../controllers/app.controller';
import { AuthController } from '../controllers/auth.controller';
import { EmployeeManagementController } from '../controllers/employee-management.controller';
import { AppService } from '../services/app.service';
import { AuthService } from '../services/auth-service';
import { EmployeeManagementService } from '../services/employee-management.service';
import { SecurityUtilityService } from '../utility/security-utils';

export const AppModuleControllers = [
  AppController,
  EmployeeManagementController,
  AuthController,
];

export const AppModuleService = [
  AppService,
  EmployeeManagementService,
  SecurityUtilityService,
  AuthService,
];
