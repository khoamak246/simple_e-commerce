// ? Regex
export const FULL_NAME_REGEX = /^([A-za-z]+\s)+[a-zA-z]+$/;
export const USER_NAME_REGEX = /(^[a-zA-z0-9]{6,30}$)/;
export const PHONE_NUMBER_REGEX = /^[0-9]{10}$/;
export const EMAIL_REGEX =
  /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
export const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/;
export const NUMBER_FORMAT_REGEX = /^[0-9]+$/;
export const LOGIN_USERNAME_REGEX =
  /(^[a-zA-z0-9]{6,30}$)|([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)|(^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$)/;
export const SHOP_NAME_REGEX = /^([A-za-z0-9]+\s|([A-za-z0-9]))+[a-zA-z0-9]+$/;

// ? Invalid message
export const ERROR_FULL_NAME_MESS = "OOP! Something wrong with your full name!";
export const ERROR_USER_NAME_RESS =
  "OOP! Username must be 6-30 letter and not have special character!";
export const ERROR_PHONE_NUMBER_MESS =
  "OOP! Something wrong with your phoneNumber!";
export const ERROR_EMAIL_MESS = "OOP! Something wrong with your email!";
export const ERROR_PASSWORD_MESS =
  "OOP! Your password must have at least 6 character and one upper character!";
export const ERROR_SHOP_NAME_MESS =
  "OOP! Shop name must be 6-30 letter and not have special character!";

//   ? Validation function
export const validationRegex = (pattern, data) => {
  return pattern.test(data);
};
