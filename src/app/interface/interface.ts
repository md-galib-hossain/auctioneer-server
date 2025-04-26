
export type TSendResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: {
    page: number| undefined;
    limit: number| undefined;
    total: number| undefined;
  }| null ;
  data: T | null | undefined;
};

export type TPaginationOptions = {
  page : number| undefined;
  limit : number| undefined;
  sortBy : string | undefined;
  sortOrder: string | undefined;
}


export type TGenericResponse<T> = {
  meta: {
    page: number | undefined;
    limit: number | undefined;
    total: number| undefined;
  };
  data: T;
};