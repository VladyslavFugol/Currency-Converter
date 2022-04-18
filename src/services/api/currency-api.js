import { $host } from './index'

function currencyToClientFormat(data) {
  const objData = {}

  data.forEach(item => {
    objData[item.ccy] = +item.buy
  })

  objData['UAH'] = 1

  return objData
}

export async function getCurrency() {
  const { data } = await $host.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')

  return currencyToClientFormat(data)
}



