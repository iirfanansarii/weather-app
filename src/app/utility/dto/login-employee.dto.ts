import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class LoginEmployeeDto {
  @IsEmail()
  @IsNotEmpty({ message: 'email is is mandatory' })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/, {
    message: 'please enter a valid email',
  })
  @Length(1, 64)
  readonly emailAddress: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
