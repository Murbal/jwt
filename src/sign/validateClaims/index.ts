import { claimNameTypeMapping } from './validate';
import { ClaimName, Claims, SimpleClaims } from '../../types/claims';
import { CLAIM_NAMES } from '../../constants/claims';

export function assertClaimName(v: any): asserts v is ClaimName {
  if (CLAIM_NAMES.includes(v)) {
    return;
  }

  throw new TypeError(
    `${JSON.stringify(v)} is not in ${JSON.stringify(CLAIM_NAMES)}!`
  );
}

export function assertClaims(
  claimsToValidate: SimpleClaims
): asserts claimsToValidate is Claims {
  Object.entries(claimsToValidate).forEach(([claimName, claimValue]) => {
    assertClaimName(claimName);

    const assertor = claimNameTypeMapping[claimName];

    assertor(claimValue);
  });
}
