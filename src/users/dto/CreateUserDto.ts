import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsNotEmpty()
  roles: string;

  @IsNumber()
  age: number;
}