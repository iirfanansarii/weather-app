import { AppController } from '../controllers/app.controller';
import { EmployeeManagementController } from '../controllers/employee-management.controller';
import { AppService } from '../services/app.service';
import { EmployeeManagementService } from '../services/employee-management.service';

export const AppModuleControllers = [AppController, EmployeeManagementController];

export const AppModuleService = [AppService, EmployeeManagementService];
