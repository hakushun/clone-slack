export const isRequired = (name: string) => (value: string): null | string =>
  value ? null : `${name} is Required`;

// eslint-disable-next-line no-useless-escape
const mailRegexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const isEmail = (value: string): null | string => {
  if (!value) return null;
  return value.match(mailRegexp) ? null : 'Is not Email';
};

export const minValue = (min: number) => (value: string): null | string => {
  if (!value) return null;
  return value.length >= min ? null : `Should be greater than ${min}`;
};

export const mxaValue = (max: number) => (value: string): null | string => {
  if (!value) return null;
  return value.length <= max ? null : `Should be shorter than ${max}`;
};

export const composeValidators = (...validators: any[]) => (
  value: string,
): null | string =>
  validators.reduce((error, validator) => error || validator(value), null);
