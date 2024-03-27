import { sign, verify } from 'jsonwebtoken';
import { TokenPayload } from '../dtos';
import { env } from '../env';

export class JwtHelper {
  public create(payload: TokenPayload): string {
    const token = sign({ ...payload }, env.JWT_SECRET);
    return token;
  }

  public verify(token: string): TokenPayload {
    return verify(token, env.JWT_SECRET) as TokenPayload;
  }
}

export const jwtHelper = new JwtHelper();
