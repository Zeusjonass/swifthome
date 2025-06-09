

export const formatCurrency = (
  amount: number,
  currency: string,
  locale: string = "es-MX"
) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  });

  return formatter.format(amount);
};