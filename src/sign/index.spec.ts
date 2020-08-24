import { sign } from '.';
import { Claims, NumericDate } from '../types/claims';

describe('sign', () => {
  it('should build correct jwt', () => {
    const claims: Claims = { iss: 'joe', exp: 1300819380 as NumericDate };
    const payload = { 'http://example.com/is_root': true };

    expect(sign({ claims, payload, secret: 'secret' })).toBe(
      `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLCJleHAiOjEzMDA4MTkzODAsImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.x2cs4hRCGTt26GSwzk9DHqnt1Qk6jN-s9OEB7EBTAQI`
    );
  });
});
