import { verify, isValidJwtJoseHeader } from '.';

describe('verify', () => {
  it('should throw error "Malformed JWT!"', () => {
    const jwtList = [
      'sfinskgfs',
      'sjdkjsm.sds',
      'sjdiksnjdks.sjdisjmjdiks.ignidk/',
    ];

    jwtList.forEach((jwt) =>
      expect(() => verify(jwt, 'secret')).toThrow('Malformed JWT!')
    );
  });

  it('should throw error "Invalid signature!"', () => {
    const jwt = // signed with secret: "secre"
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLCJleHAiOjEzMDA4MTkzODAsImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.pzsuX-wM3PtSFT2A3Ris8zIIDkNUmGz4DkmMebEOHkc';

    expect(() => verify(jwt, 'secret')).toThrow('Invalid signature!');
  });

  it('should throw error "Malformed header!"', () => {
    expect(() =>
      verify(
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImFkZGl0aW9uYWxLZXkiOiJhZGRpdGlvbmFsVmFsdWUifQ.eyJpc3MiOiJqb2UiLCJleHAiOjEzMDA4MTkzODAsImlzQWRtaW4iOiJ0cnVlIn0.Nu1x96_z5KK93cEwyl9pI_aF1QYoA43BGvFC9A8IK6E',
        'secre'
      )
    ).toThrow('Malformed header!');
  });

  it('should return payload on success', () => {
    expect(
      verify(
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLCJleHAiOjEzMDA4MTkzODAsImlzQWRtaW4iOiJ0cnVlIn0.lgRFysZhO3p8Ni_mnNv8Ywvf5DnilrTyLgEeQ4aNlBg',
        'secre'
      )
    ).toEqual({
      iss: 'joe',
      exp: 1300819380,
      isAdmin: 'true',
    });
  });
});

describe('isValidJwtJoseHeader', () => {
  it('should return true for {alg: "HS256", typ: "JWT"}', () => {
    expect(isValidJwtJoseHeader({ alg: 'HS256', typ: 'JWT' })).toBe(true);
  });

  it('should return false on more keys than allowed', () => {
    expect(
      isValidJwtJoseHeader({
        alg: 'HS256',
        typ: 'JWT',
        additionalKey: 'additionalValue',
      })
    ).toBe(false);
  });
});
