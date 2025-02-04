/* eslint-disable import/no-cycle */
export interface IResponse {
  success: boolean;
  error: any;
  data: any;
  code: number;
}

export default IResponse;
