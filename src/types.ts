export interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IResponseData<T> {
  message: string;
  data: T;
  error: string;
}
