import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class SignInRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "id",
    description: "username, email"
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "password",
    description: "password"
  })
  password: string;
}