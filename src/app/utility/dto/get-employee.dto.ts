import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetEmployeeDto {
  @IsOptional()
  @ApiProperty({ type: String })
  @IsString()
  search: string;

  @IsNotEmpty({ message: 'limit is mandatory' })
  @ApiProperty({ type: Number })
  @Type(() => Number)
  @IsNumber()
  limit: number;

  @IsNotEmpty({ message: 'offset is mandatory' })
  @ApiProperty({ type: Number })
  @Type(() => Number)
  @IsNumber()
  offset: number;

  @IsNotEmpty({ message: 'sort column and direction is mandatory' })
  @ApiProperty({ type: String })
  @IsString()
  sort: string;
}
