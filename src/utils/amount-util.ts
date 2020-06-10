import CURRENCY_CODES from './constants/currency-codes';
import CURRENCY_DECIMALS from './constants/currency-decimals';

/**
 * @private
 * @param {string} currencyCode
 * @returns {number}
 * Get divider amount
 */
export const getDivider = (currencyCode: string): number => CURRENCY_DECIMALS[currencyCode] || 100;

/**
 * @private
 * @param {string} currencyCode
 * @returns {boolean}
 * Returns whether a CURRENCY CODE is valid
 */
export const isValidCurrencyCode = (currencyCode: string): boolean => !!CURRENCY_CODES[currencyCode];

/**
 * @private
 */
export const getCurrencyCode = (currencyCode: string): string => (isValidCurrencyCode(currencyCode) ? CURRENCY_CODES[currencyCode] : false);

/**
 * @private
 */
export const getDecimalAmount = (amount: number | string, currencyCode: string): number => {
    const divider = getDivider(currencyCode);
    return parseInt(String(amount), 10) / divider;
};

/**
 * @private
 */
export const getLocalisedAmount = (amount: number, locale: string, currencyCode: string, options = {}): string => {
    const stringAmount = amount.toString(); // Changing amount to string to avoid 0-value from returning false

    const decimalAmount = getDecimalAmount(stringAmount, currencyCode);
    const formattedLocale = locale.replace('_', '-');

    const localeOptions = {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'symbol',
        ...options
    };

    try {
        return decimalAmount.toLocaleString(formattedLocale, localeOptions);
    } catch (e) {
        return stringAmount;
    }
};

/**
 * @private
 */
export const getLocalisedPercentage = (percent = 0, locale: string): string => {
    const decimalPercent = percent / 100 / 100;
    const localeOptions = {
        style: 'percent',
        maximumFractionDigits: 2
    };

    try {
        return decimalPercent.toLocaleString(locale, localeOptions);
    } catch (e) {
        return null;
    }
};