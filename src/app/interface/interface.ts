
export interface IMeta {
  page?: number;
  limit?: number;
  total?: number;
  nextCursor?: string | null;
}
export type TSendResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: IMeta | null;
  data: T | null | undefined;
};


export type TPaginationOptions = {
  limit?: number;
  cursor?: string;
};



export type TGenericResponse<T> = {
  meta: {
    limit?: number;
    total?: number;
    nextCursor?: string | null;
  };
  data: T;
};
