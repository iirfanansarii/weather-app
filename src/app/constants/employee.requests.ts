import { OperationType } from './app.enum';

export class EmployeeRequest {
  userId: string;
  username: string;
  emailAddress: string;
  accessTypeId: string;
  hasGlobalAccess: boolean;
  roleId: string;
  phoneNumber: string;
  pin: number;
  password: string;
  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  version: number;

  /**
   * @constructor
   * @param data :any
   * @param key :string (if its 'A' create Add Employee Request else create Update Employee Request )
   * called when the EmployeeRequest is created
   */
  constructor(data: any, key: string, logInUser?: string) {
    this.userId = data.userId?.toLowerCase();
    this.username = data.username;
    this.emailAddress = data.emailAddress;
    this.accessTypeId = data?.accessTypeId;
    this.hasGlobalAccess = true;
    this.roleId = data?.roleId;
    this.phoneNumber = data?.phoneNumber;
    this.pin = data?.pin;
    this.password = data?.password;
    this.isActive = true;
    this.password = data?.password;
    if (!!data.version) {
      this.version = data.version;
    }
    switch (key) {
      case OperationType.Create: {
        this.createdBy = logInUser || '';
        this.isDeleted = false;
        break;
      }
      case OperationType.Update: {
        this.updatedBy = logInUser || '';
        this.isDeleted = false;
        break;
      }
      case OperationType.Delete: {
        this.updatedBy = logInUser || '';
        this.isDeleted = true;
        break;
      }
      default:
        break;
    }
  }
}
