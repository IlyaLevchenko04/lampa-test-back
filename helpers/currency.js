async function getCurrency(currencyQuery) {
  const upperCurrency = currencyQuery.toUpperCase();

  const monoCurrency = await fetch('https://api.monobank.ua/bank/currency')
    .then(data => data.json())
    .then(data => {
      if (upperCurrency === 'USD') {
        const usd = data.find(({ currencyCodeA }) => currencyCodeA === 840);

        return { sell: usd.rateSell, currency: 'USD' };
      }

      if (upperCurrency === 'EUR') {
        const eur = data.find(({ currencyCodeA }) => currencyCodeA === 978);

        return { sell: eur.rateSell, currency: 'EUR' };
      }

      return { sell: 1, currency: 'UAH' };
    });

  return monoCurrency;
}

module.exports = {
  getCurrency,
};
