/* utils/validator.js */

function isRequired(value){

    return value !== null &&
           value !== undefined &&
           value.toString().trim() !== "";

}

function isValidNumber(value){

    return !isNaN(value);

}

function isPositiveNumber(value){

    return isValidNumber(value) &&
           Number(value) > 0;

}

function isValidEmail(email){

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}

function isStrongPassword(password){

    return password.length >= 8;

}

function isValidDate(date){

    return !isNaN(
        new Date(date).getTime()
    );

}

function isFutureDate(date){

    return new Date(date) >
        new Date();

}

function hasMaxLength(value,length){

    return value.length <= length;

}

function hasMinLength(value,length){

    return value.length >= length;

}

function isInRange(value,min,max){

    return Number(value) >= min &&
           Number(value) <= max;

}

function isValidAmount(amount){

    return isPositiveNumber(amount);

}

function isCategorySelected(category){

    return isRequired(category);

}