import { AppController } from '../controllers/app.controller';
import { UserManagementController } from '../controllers/user-management.controller';
import { AppService } from '../services/app.service';
import { UserManagementService } from '../services/user-management.service';

export const AppModuleControllers = [AppController, UserManagementController];

export const AppModuleService = [AppService, UserManagementService];
