const { CURRENCY_ENUM, CURRENCY_CODE_ENUM } = require('./currencyEnum');
const { errorHandler } = require('../errors/errorHandler');

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
      throw errorHandler('MonoAPI error; Too many requests', 500);
    });

  return monoCurrency;
}

module.exports = {
  getCurrency,
};
