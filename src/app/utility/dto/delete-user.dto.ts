import { Length, IsEmail, IsNotEmpty, Matches, IsInt } from 'class-validator';

export class DeleteEmployeeDto {
  @IsNotEmpty({ message: 'Employee id is mandatory' })
  @IsEmail()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/, {
    message: 'employeeId must be an email',
  })
  @Length(1, 64)
  employeeId: string;

  @IsInt()
  @IsNotEmpty()
  version: number;
}
