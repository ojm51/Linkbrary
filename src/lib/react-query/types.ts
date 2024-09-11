export type TQueryResponse<T> =
  | undefined
  | {
      data: T;
    };

export type TMutationResponse<T> =
  | undefined
  | {
      data: T;
    };
