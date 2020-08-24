import { Keys } from './helpers';

declare const tag: unique symbol;
export type NumericDate = number & { readonly [tag]: 'NUMERIC_DATE' };
export type Audience = (string | string[]) & { readonly [tag]: 'AUDIENCE' };

export type SimpleClaims = {
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
};

export type Claims = {
  iss?: string;
  sub?: string;
  aud?: Audience;
  exp?: NumericDate;
  nbf?: NumericDate;
  iat?: NumericDate;
  jti?: string;
};

export type ClaimName = Keys<Claims>;
