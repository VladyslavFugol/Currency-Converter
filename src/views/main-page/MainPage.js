import { useEffect, useState } from 'react'

import { ReactComponent as Arrows } from 'assets/arrows.svg'
import { getCurrency } from 'services/api/currency-api'
import { CurrencyInput, ErrorMessage, Spinner } from 'components'
import Header from './header/Header'

import styles from './MainPage.module.scss'

function MainPage() {
  const [firstCurrency, setFirstCurrency] = useState({
    value: 1,
    rate: 'UAH'
  })
  const [secondCurrency, setSecondCurrency] = useState({
    value: 1,
    rate: 'UAH'
  })

  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [rates, setRates] = useState({})

  useEffect(() => {
    setLoading(true)

    getCurrency()
      .then(setRates)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  const takeOptionsFromRates = (rates) => {
    const options = []

    for (const key in rates) {
      options.push(key)
    }

    return options
  }

  const handleChangeFirstCurrencyValue = (value) => {
    const updatedSecondCurrencyValue = value * rates[firstCurrency.rate] / rates[secondCurrency.rate]

    setFirstCurrency({ ...firstCurrency, value })
    setSecondCurrency({
      ...secondCurrency,
      value: updatedSecondCurrencyValue.toFixed(0)
    })
  }

  const handleChangeSecondCurrencyValue = (value) => {
    const updatedFirstCurrencyValue = value * rates[secondCurrency.rate] / rates[firstCurrency.rate]

    setSecondCurrency({ ...secondCurrency, value })
    setFirstCurrency({
      ...firstCurrency,
      value: updatedFirstCurrencyValue.toFixed(0)
    })
  }

  const handleChangeFirstCurrencyRate = (rate) => {
    const updatedSecondCurrencyValue = firstCurrency.value * rates[rate] / rates[secondCurrency.rate]

    setSecondCurrency({
      ...secondCurrency,
      value: updatedSecondCurrencyValue.toFixed(0)
    })
    setFirstCurrency({ ...firstCurrency, rate })
  }

  const handleChangeSecondCurrencyRate = (rate) => {
    const updatedFirstCurrencyValue = secondCurrency.value * rates[rate] / rates[firstCurrency.rate]

    setSecondCurrency({ ...secondCurrency, rate })
    setFirstCurrency({
      ...firstCurrency,
      value: updatedFirstCurrencyValue.toFixed(0)
    })
  }

  const renderContent = () => {
    if (loading) {
      return <Spinner/>
    }

    if (error) {
      return <ErrorMessage/>
    }

    const options = takeOptionsFromRates(rates)

    return <>

      <div className={styles.main}>
        <form className={styles.form}>
          <CurrencyInput
            value={firstCurrency.value}
            rate={firstCurrency.rate}
            onValueChange={handleChangeFirstCurrencyValue}
            onRateChange={handleChangeFirstCurrencyRate}
            options={options}
          />
          <Arrows/>
          <CurrencyInput
            value={secondCurrency.value}
            rate={secondCurrency.rate}
            onValueChange={handleChangeSecondCurrencyValue}
            onRateChange={handleChangeSecondCurrencyRate}
            options={options}
          />
        </form>
      </div>
    </>
  }

  return (
    <div className={styles.container}>
      <Header/>
      {renderContent()}
    </div>
  )
}

export default MainPage
