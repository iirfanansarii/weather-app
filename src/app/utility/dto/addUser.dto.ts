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
} from 'class-validator';

export class AddUserDto {
  @IsNotEmpty({ message: 'userName is mandatory' })
  @IsString()
  @Length(1, 64)
  @Matches(/^[a-zA-Z][a-zA-Z ]*$/, { message: 'userName should be valid' })
  readonly userName: string;

  @IsEmail()
  @IsNotEmpty({ message: 'email is is mandatory' })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/, {
    message: 'please enter a vlaid email',
  })
  @Length(1, 64)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('IN', { message: 'Invalid phone number format' })
  readonly phoneNumber: string;

  @IsNumber()
  @IsNotEmpty()
  readonly pin: number;

  @IsString()
  @IsNotEmpty()
  readonly role: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
