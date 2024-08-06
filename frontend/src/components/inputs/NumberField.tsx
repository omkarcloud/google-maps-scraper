import Browser from '../../utils/browser'
import { EuiFieldNumber } from '@elastic/eui'
import { readNumber } from '../../utils/missc'


export default function NumberField({ value, onChange, ...props }: any) {
  const handleNumberChange = event => {
    const value = Browser.inputValue(event)
    onChange(readNumber(value))
  }

  return (
    <EuiFieldNumber
      {...props}
      fullWidth
      onBlur={() => onChange(value)}
      value={value ?? ''}
      onChange={handleNumberChange}
    />
  )
}
