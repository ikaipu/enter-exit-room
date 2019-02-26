import { isEmail } from 'validator';

export const isValidEmailFormat = (email: string): boolean => isEmail(email);
