export type Token = {
  currency: string;
  price: number;
  date: string;
  icon?: string;
};

export type ApiResponse<T> = {
  data: T;
  success: boolean;
  error?: string;
};
