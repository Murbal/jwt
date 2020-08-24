import { assertClaims, assertClaimName } from '.';
import { CLAIM_NAMES } from '../../constants/claims';

describe('validateClaims', () => {
  it('should throw error on unknown key', () => {
    expect(() => assertClaimName('unknown_claim')).toThrow(
      `is not in ${JSON.stringify(CLAIM_NAMES)}!`
    );
  });

  it('should throw error on unknown key when validating claims obj', () => {
    const claims = {
      aud: 'audience',
      unknown_key: 'some_value',
    };

    expect(() => assertClaims(claims)).toThrow(
      `is not in ${JSON.stringify(CLAIM_NAMES)}!`
    );
  });

  it('should throw error on encountering wrong type', () => {
    const claimsList = [
      {
        claims: { iss: 1 },
        errorMsg: 'is not a string!',
      },
      {
        claims: { sub: 1 },
        errorMsg: 'is not a string!',
      },
      {
        claims: { aud: 1 },
        errorMsg: 'must be either a string or array of strings!',
      },
      {
        claims: { exp: 'some_string' },
        errorMsg: 'is not a NumericDate!',
      },
      {
        claims: { nbf: 'some_string' },
        errorMsg: 'is not a NumericDate!',
      },
      {
        claims: { iat: 'some_string' },
        errorMsg: 'is not a NumericDate!',
      },
      {
        claims: { jti: ['some_string'] },
        errorMsg: 'is not a string!',
      },
    ];

    claimsList.forEach(({ claims, errorMsg }) => {
      expect(() => assertClaims(claims as any)).toThrow(errorMsg);
    });
  });

  it('should not throw when validating', () => {
    expect(() =>
      assertClaims({
        iss: '',
        sub: '',
        aud: ['', ''],
        exp: 1,
        nbf: 1,
        iat: 1,
        jti: '',
      })
    ).not.toThrow();
  });
});
