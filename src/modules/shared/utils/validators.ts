/* eslint-disable */

const calcFirstChecker = (firstNineDigits: string): number => {
  let sum = 0;

  for (let j = 0; j < 9; ++j) {
    sum += Number(firstNineDigits.toString().charAt(j)) * (10 - j);
  }

  const lastSumChecker1 = sum % 11;
  const checker1 = lastSumChecker1 < 2 ? 0 : 11 - lastSumChecker1;

  return checker1;
};

const calcSecondChecker = (cpfWithChecker1: string): number => {
  let sum = 0;

  for (let k = 0; k < 10; ++k) {
    sum += Number(cpfWithChecker1.toString().charAt(k)) * (11 - k);
  }

  const lastSumChecker2 = sum % 11;
  const checker2 = lastSumChecker2 < 2 ? 0 : 11 - lastSumChecker2;

  return checker2;
};

// get length in type-agnostic way
const len = (value: any) => {
  if (Array.isArray(value)) return value.length;
  if (typeof value === 'object') {
    return Object.keys(value).length;
  }
  return String(value).length;
}

export const validateCPF = (value: string | number): boolean => {
  if (typeof value !== 'string' && typeof value !== 'number') {
    console.warn('Unsupported value');
    return false;
  }

  const cleanCPF = String(value).replace(/\.|-|\s/g, '');
  const firstNineDigits = cleanCPF.substring(0, 9);
  const checker = cleanCPF.substring(9, 11);

  if (cleanCPF.length !== 11) {
    return false;
  }

  // Checking if all digits are equal
  for (let i = 0; i < 10; i++) {
    if (`${firstNineDigits}${checker}` === Array(12).join(String(i))) {
      return false;
    }
  }

  const checker1 = calcFirstChecker(firstNineDigits);
  const checker2 = calcSecondChecker(`${firstNineDigits}${checker1}`);

  return checker.toString() === checker1.toString() + checker2.toString();
};

export const required = (value: any) => {
  if (Array.isArray(value)) return !!value.length;
  if (value === undefined || value === null) {
    return false;
  }

  if (value === false) {
    return true;
  }

  if (value instanceof Date) {
    // invalid date won't pass
    return !isNaN(value.getTime());
  }

  if (typeof value === 'object') {
    for (const _ in value) return true;
    return false;
  }

  return !!String(value).length;
};

export const email = (value: string): boolean => {
  const emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;

  return !required(value) || emailRegex.test(value);
};

export const minLength = (length: number, value: any): boolean => {
  return !required(value) || len(value) >= length;
}

export const isValidDate = (value: string): boolean => {
  const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

  if (!dateRegex.test(value)) {
    return false;
  }

  const [day, month, year] = value.split('/').map(part => parseInt(part, 10));
  const date = new Date(year, (month - 1), day);
  
  return (
    (date.getFullYear() === year) &&
    (date.getMonth() === (month - 1)) &&
    (date.getDate() === day)
  );
}

export const tel = (value: string): boolean => {
  const telRegex = /^\(?\d{2}\)?\s\d{4,5}\-\d{4}$/;
  return !required(value) || telRegex.test(value);
}
