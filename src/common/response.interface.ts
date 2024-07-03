// src/common/response.interface.ts
export interface ApiResponse {
  Status: number;
  IsSuccess: boolean;
  Message: string;
  Data?: any;
}
