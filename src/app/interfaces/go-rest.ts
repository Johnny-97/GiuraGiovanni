export interface GoRestUser{
  id?: number,
  name?: string,
  email?:string;
  gender?: 'male' | 'female',
  status?: 'active' | 'inactive'
}

export interface GoRestResponse<T>{
  code: number,
  meta: any,
  data: T
}