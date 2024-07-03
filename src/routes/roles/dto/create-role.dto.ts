import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;
}
