import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsPhoneNumber,
  IsNumber,
  IsBoolean,
  Matches,
  Length,
  MaxLength,
} from 'class-validator';
import { AppRoles } from '../../constants/app.enum';

export class AddEmployeeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  readonly employeeId: string;

  @IsNotEmpty({ message: 'employeeName is mandatory' })
  @IsString()
  @Length(1, 64)
  @Matches(/^[a-zA-Z][a-zA-Z ]*$/, { message: 'employeeName should be valid' })
  readonly employeeName: string;

  @IsEmail()
  @IsNotEmpty({ message: 'email is is mandatory' })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/, {
    message: 'please enter a valid email',
  })
  @Length(1, 64)
  readonly emailAddress: string;

  @IsNotEmpty({ message: 'accessTypeId is mandatory' })
  @IsString()
  @Length(1, 50)
  readonly accessTypeId: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly hasGlobalAccess: boolean;

  @IsString()
  @IsNotEmpty()
  readonly roleId: AppRoles;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('IN', { message: 'Invalid phone number format' })
  readonly phoneNumber: string;

  @IsNumber()
  @IsNotEmpty()
  readonly pin: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
