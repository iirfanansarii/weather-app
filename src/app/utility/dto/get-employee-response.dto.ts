import { AppRoles } from '../../constants/app.enum';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetEmployeeResponseDto {
  @Expose()
  @ApiProperty({ type: String })
  public employeeId: string;

  @Expose()
  @ApiProperty({ type: String })
  public employeeName: string;

  @Expose()
  @ApiProperty({ type: String })
  public emailAddress: string;

  @Expose()
  @ApiProperty({ type: String })
  public accessTypeId: string;

  @Expose()
  @ApiProperty({ type: String })
  public hasGlobalAccess: boolean;

  @Expose()
  @ApiProperty({ type: String })
  public roleId: AppRoles;

  @Expose()
  @ApiProperty({ type: String })
  public phoneNumber: string;

  @Expose()
  @ApiProperty({ type: String })
  public pin: number;

  @ApiProperty({ type: String })
  public password: string;
}
