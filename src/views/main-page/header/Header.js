import { useEffect, useState } from 'react'
import { getCurrency } from 'services/api/currency-api'

import styles from './Header.module.scss'

function Header() {
  const [exchangeRates, setExchangeRates] = useState({})

  useEffect(() => {
    getCurrency()
      .then(setExchangeRates)
  }, [])

  const ratesFromObjectToArray = (data) => {
    const rates = []

    for (const key in data) {
      if (key === 'EUR' || key === 'USD') {
        rates.push({ currencyName: key, currencyBuy: +exchangeRates[key] })
      }
    }

    return rates
  }

  const renderRates = (rates) => {
    return (
      <>
        {rates?.map(({ currencyBuy, currencyName }) => (
          <div
            className={styles.currency}
            key={currencyName}
          >{currencyBuy.toFixed(2) + ' ' + currencyName}
          </div>
        ))}
      </>
    )
  }

  const rates = ratesFromObjectToArray(exchangeRates)

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.logo}>Currency Converter</div>
        <div className={styles.exchangeRates}>
          {renderRates(rates)}
        </div>
      </div>
    </div>
  )
}

export default Header
