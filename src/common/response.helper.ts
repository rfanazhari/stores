import { HttpStatus } from '@nestjs/common';
import { ResponseSuccess } from './response.interface';

export function formatResponse<T>(
  statusCode: number,
  data: T,
): ResponseSuccess<T> {
  return {
    statusCode,
    data,
  };
}

export function successResponse<T>(data: T): ResponseSuccess<T> {
  return formatResponse(HttpStatus.OK, data);
}
