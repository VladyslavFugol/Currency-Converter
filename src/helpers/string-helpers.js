export const twoDigitsAfterPoint = (string) => {
  const stringArray = string.split('.')

  return stringArray[0] + '.' + stringArray[1].slice(0, 2)
}
