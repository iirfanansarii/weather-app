export enum MessageType {
  Success = 'Success',
  Error = 'Error',
}

export enum OperationType {
  Update = 'Update',
  Create = 'Create',
  Delete = 'Delete',
}
export enum AppRoles {
  Admin = 'ADMIN',
  User = 'USER',
  Employee = 'EMPLOYEE',
}

export enum UserMessageCheckKeys {
  User = 'User',
}

export enum ErrorMessage {
  BadRequest = 'Invalid Input Data',
  NotFound = 'Your not authorized access the Data.',
  UnProcess = 'User updated by another admin simultaneously',
  InternalServerError = 'Sorry we are experiencing technical problems. Please reach out to support if urgent.',
  NoUserFound = 'No User Found',
}
