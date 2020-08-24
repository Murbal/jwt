import { NumericDate } from '../types/claims';
import { Dictionary } from '../types/helpers';

export const isNumber = (v: any) => typeof v === 'number';
export const isPositive = (v: number) => v > 0;
export const isInteger = (v: number): v is number => Number.isInteger(v);
export const isNumericDate = (v: any): v is NumericDate =>
  isInteger(v) && isPositive(v);
export const isString = (v: any): v is string => typeof v === 'string';
export const isArray = (v: any): v is any[] => Array.isArray(v);
export const toBase64 = (v: any) =>
  normalizeBase64(Buffer.from(v).toString('base64'));
export const fromBase64 = (v: string) =>
  Buffer.from(v, 'base64').toString('utf8');
export const normalizeBase64 = (v: string) =>
  v.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
export const isEmptyObject = (obj: Dictionary) =>
  Object.values(obj).filter((v) => v !== undefined).length === 0;
