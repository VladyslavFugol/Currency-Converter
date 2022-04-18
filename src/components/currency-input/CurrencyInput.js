import styles from './CurrencyInput.module.scss'

function CurrencyInput(props) {
  const {
    value,
    rate,
    options,
    onValueChange,
    onRateChange
  } = props

  return (
    <label className={styles.label}>
      <input
        type='number'
        className={styles.input}
        value={value}
        onChange={event => onValueChange(event.target.value)}
      />

      <select
        className={styles.select}
        value={rate}
        onChange={event => onRateChange(event.target.value)}
      >
        {options?.map(option => <option value={option} key={option}>{option}</option>)}
      </select>
    </label>
  )
}

export default CurrencyInput
