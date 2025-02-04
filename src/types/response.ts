export interface IResponse<T = any> {
  success: boolean;
  error?: any;
  data?: T;
  code?: number;
}
