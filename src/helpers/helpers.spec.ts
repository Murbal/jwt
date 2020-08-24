import {
  isPositive,
  isNumericDate,
  isString,
  isInteger,
  isNumber,
  isArray,
  toBase64,
  fromBase64,
  normalizeBase64,
  isEmptyObject,
} from '.';

describe('global helpers', () => {
  describe('isNumber', () => {
    it('should return true for -1', () => {
      expect(isNumber(-1)).toBe(true);
    });

    it('should return false for "0"', () => {
      expect(isNumber('0')).toBe(false);
    });

    it('should return false for true, symbol, {}, []', () => {
      const inputList = [true, Symbol(), {}, []];

      inputList.forEach((input) => expect(isNumber(input)).toBe(false));
    });
  });

  describe('isInteger', () => {
    it('should return true for -1', () => {
      expect(isInteger(-1)).toBe(true);
    });

    it('should return false for 0.5', () => {
      expect(isInteger(0.5)).toBe(false);
    });
  });

  describe('isPositive', () => {
    it('should return true for 1', () => {
      expect(isPositive(1)).toBe(true);
    });

    it('should return false for 0', () => {
      expect(isPositive(0)).toBe(false);
    });

    describe('isNumericDate', () => {
      it('should return true for 1', () => {
        expect(isNumericDate(1)).toBe(true);
      });

      it('should return false for -1', () => {
        expect(isNumericDate(-1)).toBe(false);
      });

      it('should return false for true, symbol, {}, []', () => {
        const inputList = [true, Symbol(), {}, []];

        inputList.forEach((input) => expect(isNumericDate(input)).toBe(false));
      });
    });

    describe('isString', () => {
      it('should return true for empty string', () => {
        expect(isString('')).toBe(true);
      });

      it('should return true for string with content', () => {
        expect(isString('some_content')).toBe(true);
      });

      it('should return false for 0, true, symbol, {}, []', () => {
        const inputList = [0, true, Symbol(), {}, []];

        inputList.forEach((input) => expect(isString(input)).toBe(false));
      });
    });

    describe('isArray', () => {
      it('should return true for [0, "some_string", {}]', () => {
        expect(isArray([0, 'some_string', {}])).toBe(true);
      });

      it('should return false for 0, symbol, "some_string", {}', () => {
        const inputList = [0, Symbol(), 'some_string', {}];

        inputList.forEach((input) => expect(isArray(input)).toBe(false));
      });
    });
  });

  describe('isNumericDate', () => {
    it('should return false for -1', () => {
      expect(isNumericDate(-1)).toBe(false);
    });

    it('should return true for 1234', () => {
      expect(isNumericDate(1234)).toBe(true);
    });

    it('should return false for "a", true, [], {}', () => {
      const inputList = ['a', true, [], {}];

      inputList.forEach((input) => expect(isNumericDate(input)).toBe(false));
    });
  });

  describe('isString', () => {
    it('should return true for "1"', () => {
      expect(isString('1')).toBe(true);
    });

    it('should return false for 1, symbol, [], {}, true', () => {
      const inputList = [1, Symbol(), [], {}, true];

      inputList.forEach((input) => expect(isString(input)).toBe(false));
    });
  });

  describe('isArray', () => {
    it('should return true for [1, "3", symbol, [symbol, {}]', () => {
      expect(isArray([1, '3', Symbol(), [Symbol(), {}]])).toBe(true);
    });

    it('should return false for 1, {0: 2, length: 4}, false', () => {
      const inputList = [1, { 0: 2, length: 1 }, false];

      inputList.forEach((input) => expect(isArray(input)).toBe(false));
    });
  });

  describe('toBase64', () => {
    it('should strip "=" character when converting', () => {
      expect(toBase64('ab')).toBe('YWI');
    });
  });

  describe('fromBase64', () => {
    it('should convert "aHR0cDovLw" to "http://"', () => {
      expect(fromBase64('aHR0cDovLw')).toBe('http://');
    });
  });

  describe('normalizeBase64', () => {
    it('should normalize base64 correctly', () => {
      expect(normalizeBase64('+/=')).toBe('-_');
    });
  });

  describe('isEmptyObject', () => {
    it('should return true for {}', () => {
      expect(isEmptyObject({})).toBe(true);
    });

    it('should return true for {v: undefined}', () => {
      expect(isEmptyObject({ v: undefined })).toBe(true);
    });

    it('should return true for []', () => {
      expect(isEmptyObject([])).toBe(true);
    });

    it('should return false for {a: 1}', () => {
      expect(isEmptyObject({ a: 1 })).toBe(false);
    });
  });
});
