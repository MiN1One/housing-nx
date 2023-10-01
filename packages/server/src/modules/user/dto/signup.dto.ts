import {
  EMaritalStatuses,
  MaritalStatusTypes,
  UserTypes,
} from '@MiN1One/interfaces';
import { Exclude } from 'class-transformer';
import { IsEmail, IsEnum, IsString, ValidateIf } from 'class-validator';

export class SignupDto {
  @IsString()
  password: string;

  @ValidateIf((obj) => !obj.phoneNumber)
  @IsEmail()
  email: string;

  @ValidateIf((obj) => !obj.email)
  @IsString()
  phoneNumber: string;

  @IsEnum(Object.keys(EMaritalStatuses))
  maritalStatus: MaritalStatusTypes;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @Exclude()
  role: UserTypes;
}
