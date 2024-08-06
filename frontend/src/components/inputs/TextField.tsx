import { EuiFieldText } from '@elastic/eui'
import Browser from '../../utils/browser'

export default function TextField({ value, onChange, ...props }: any) {
  const handleChange = event => {
    const value = Browser.inputValue(event)
    onChange(value)
  }

  return (
    <EuiFieldText
      {...props}
      fullWidth
      value={value ?? ''}
      onChange={handleChange}
    />
  )
}
