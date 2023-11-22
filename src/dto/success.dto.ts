import { ApiProperty } from "@nestjs/swagger"

export default class SuccessResponseDto {
  @ApiProperty({
    example: true,
    description: "boolean"
  })
  success: boolean
}