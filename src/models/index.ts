export interface MyRes<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface RouteLink {
  path: string;
  title: string;
}