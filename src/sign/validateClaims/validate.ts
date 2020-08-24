import { isNumericDate, isString, isArray } from '../../helpers';
import { ClaimNameTypeMapping } from './types';
import { NumericDate, Audience } from '../../types/claims';

function assertNumericDate(v: any): asserts v is NumericDate {
  if (isNumericDate(v)) {
    return;
  }

  throw new TypeError(`${JSON.stringify(v)} is not a NumericDate!`);
}

function assertString(v: any): asserts v is string {
  if (isString(v)) {
    return;
  }

  throw new TypeError(`${JSON.stringify(v)} is not a string!`);
}

function assertAudience(v: any): asserts v is Audience {
  if (isString(v)) {
    return;
  }

  if (isArray(v) && v.every(isString)) {
    return;
  }

  throw new TypeError(
    `${JSON.stringify(v)} must be either a string or array of strings!`
  );
}

export const claimNameTypeMapping: ClaimNameTypeMapping = {
  iat: assertNumericDate,
  exp: assertNumericDate,
  nbf: assertNumericDate,
  iss: assertString,
  jti: assertString,
  sub: assertString,
  aud: assertAudience,
};
