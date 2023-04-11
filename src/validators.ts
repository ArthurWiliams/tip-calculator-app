export function isEmpty(value: string): boolean {
  return value === "";
}

export function isZero(value: string): boolean {
  return parseFloat(value) === 0;
}

export function hasWhitespace(value: string): boolean {
  return /\s/.test(value);
}

export function isDecimal(value: string): boolean {
  return /^(?:0|[1-9]\d*)(?:\.\d*)?$/.test(value);
}

export function hasLeadingZero(value: string): boolean {
  return /^0\d+/.test(value);
}

export function hasSymbol(value: string): boolean {
  return /[^\da-zA-Z]/.test(value);
}

export function hasLetter(value: string): boolean {
  return /[a-zA-Z]/.test(value);
}
