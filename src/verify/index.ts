import { Dictionary } from '../types/helpers';
import { isEmptyObject, fromBase64 } from '../helpers';
import { computeSignature } from '../sign';

export const isValidJwtJoseHeader = (header: Dictionary) => {
  const { typ, alg, ...otherKeys } = header;

  const isJwt = typ === 'JWT';
  const isHs256 = alg === 'HS256';

  if (!isEmptyObject(otherKeys)) {
    return false;
  }

  return isJwt && isHs256;
};

const VALID_JWT_REGEX = /^[\w-_]*\.[\w-_]*\.[\w-_]*$/g;

export const verify = (jwt: string, secret: string) => {
  const isValidJwt = !!jwt.match(VALID_JWT_REGEX);

  if (!isValidJwt) {
    throw new Error(`Malformed JWT!`);
  }

  const [headerBase64, payloadBase64, signatureBase64] = jwt.split('.');

  const header = JSON.parse(fromBase64(headerBase64));

  if (!isValidJwtJoseHeader(header)) {
    throw new Error(`Malformed header!`);
  }

  const signature = computeSignature(
    `${headerBase64}.${payloadBase64}`,
    secret
  );

  if (signature !== signatureBase64) {
    throw new Error(`Invalid signature!`);
  }

  return JSON.parse(fromBase64(payloadBase64));
};
