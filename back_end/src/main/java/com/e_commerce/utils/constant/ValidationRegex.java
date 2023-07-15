package com.e_commerce.utils.constant;

public final class ValidationRegex {
        public static final String INVALID_MESSAGE = "Miss matcher data!";
        public static final String FULL_NAME_REGEX = "^([A-za-z]+\\s)+[a-zA-z]+$";
        public static final String USER_NAME_REGEX = "(^[a-zA-z0-9]{6,30}$)|(^[0-9]{10}$)";
        public static final String PHONE_NUMBER_REGEX = "^[0-9]{10}$";
        public static final String EMAIL_REGEX = "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
        public static final String PASSWORD_REGEX = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$";
        public static final String NUMBER_FORMAT_REGEX = "^[0-9]+$";
        public static final String LOGIN_USERNAME_REGEX = "(^[a-zA-z0-9]{6,30}$)|(^[0-9]{10}$)|([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)|(^[0-9]{10}$)";
        public static final String SHOP_NAME_REGEX = "^([A-za-z0-9]+\\s|([A-za-z0-9]))+[a-zA-z0-9]+$";
        public static final String DATE_YEAR_REGEX = "^\\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$";
        public static boolean isMatcherRegex(String regex, String value) {
                return value.matches(regex);
        }

}
