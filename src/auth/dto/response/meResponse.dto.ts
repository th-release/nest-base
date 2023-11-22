import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsEnum, IsNumber, IsString, IsUUID } from "class-validator";

export default class MeResponseDto {
  @IsUUID()
  @ApiProperty({
    example: "e39808a5-87c4-4db5-b2e8-8d43872a913a",
    description: "유저 고유 uuid"
  })
  uuid: string;

  @IsEmail()
  @ApiProperty({
    example: "unknowns@unknownMail.com",
    description: "유저 email"
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: "username",
    description: "아이디"
  })
  username: string;

  @IsNumber()
  credits: number;

  @IsEnum(['user', 'admin'])
  role: 'user' | 'admin'

  @IsDateString()
  createdAt: string | Date;
}