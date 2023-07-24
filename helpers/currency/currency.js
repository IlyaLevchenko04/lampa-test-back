const { CURRENCY_ENUM, CURRENCY_CODE_ENUM } = require('./currencyEnum');
const { errorHandler } = require('../../middlewares/errorHandler');
const CustomError = require('../errors/customError');
const errorsEnum = require('../errors/errorsEnum');

async function getCurrency(currencyQuery) {
  const upperCurrency = currencyQuery.toUpperCase();

  const monoCurrency = await fetch('https://api.monobank.ua/bank/currency')
    .then(data => data.json())
    .then(data => {
      if (upperCurrency === CURRENCY_ENUM.USD) {
        const usd = data.find(
          ({ currencyCodeA }) => currencyCodeA === CURRENCY_CODE_ENUM.USD
        );

        return { sell: usd.rateSell, currency: CURRENCY_ENUM.USD };
      }

      if (upperCurrency === CURRENCY_ENUM.EUR) {
        const eur = data.find(
          ({ currencyCodeA }) => currencyCodeA === CURRENCY_CODE_ENUM.EUR
        );

        return { sell: eur.rateSell, currency: CURRENCY_ENUM.EUR };
      }

      return { sell: 1, currency: 'UAH' };
    })
    .catch(err => {
      throw new CustomError(errorsEnum.MONO_API_ERROR);
    });

  return monoCurrency;
}

module.exports = {
  getCurrency,
};
