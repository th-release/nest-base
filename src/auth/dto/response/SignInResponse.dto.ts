import { ApiProperty } from "@nestjs/swagger"

export default class SignInResponseDto {
  @ApiProperty({
    example: true,
    description: "boolean"
  })
  success: boolean

  @ApiProperty({
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNWEwMjY2YWQtMmU3Mi00ZT....",
    description: "string (token)"
  })
  access_token: string
}