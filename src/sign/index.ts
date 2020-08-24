import { createHmac } from 'crypto';
import { SimpleClaims } from '../types/claims';
import { toBase64, normalizeBase64 } from '../helpers';
import { SIGN_HEADER } from '../constants/sign';
import { assertClaims } from './validateClaims';

type SignProps = {
  claims: SimpleClaims;
  payload: any;
  secret: string;
};

export const computeSignature = (signingInput: string, secret: string) =>
  normalizeBase64(
    createHmac('SHA256', secret).update(signingInput).digest('base64')
  );

export const sign = ({ claims, payload: customPayload, secret }: SignProps) => {
  assertClaims(claims);

  const headerBase64 = toBase64(JSON.stringify(SIGN_HEADER));
  const payloadBase64 = toBase64(
    JSON.stringify({ ...claims, ...customPayload })
  );

  const signingInput = `${headerBase64}.${payloadBase64}`;

  const signatureBase64 = computeSignature(signingInput, secret);

  return `${signingInput}.${signatureBase64}`;
};
