import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export default class SignUpRequestDto {
  @IsString()
  @IsEmail()
  @MaxLength(320)
  @ApiProperty({
    example: "unknowns@unknownMail.com",
    description: "email, maxLength(320)"
  })
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "username",
    description: "username: string"
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "password",
    description: "password: string"
  })
  password: string;

  @IsString()
  @MinLength(16)
  @MaxLength(16)
  @ApiProperty({
    example: "1234567890asdFGH",
    description: "16자리 이메일 인증 코드"
  })
  code: string
}