
export type TSendResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: {
    limit?: number;
    total?: number;
    nextCursor?: string | null;
  } | null;
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
