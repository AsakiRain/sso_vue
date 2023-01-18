export interface MyRes<T = unknown> {
  code: number;
  message: string;
  data: T;
}

export interface RouteLink {
  path: string;
  title: string;
}
