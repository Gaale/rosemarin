import { SessionData } from 'express-session';

export interface TypedSessionData extends SessionData {
  uid?: number;
}
