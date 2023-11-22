import { Request } from 'express'

export class LocalsDto {
  uuid: number
}

export type TypedRequest = Request & Partial<LocalsDto>

export type GuardedRequest = Request & LocalsDto