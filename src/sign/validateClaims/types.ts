import { Claims, ClaimName } from '../../types/claims';

export type ClaimNameTypeMapping = {
  [k in ClaimName]: (v: any) => asserts v is Exclude<Claims[k], undefined>;
};
