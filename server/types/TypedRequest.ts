import { Request } from 'express';

export interface TypedRequest<T> extends Request {
  ResBody: T;
}
