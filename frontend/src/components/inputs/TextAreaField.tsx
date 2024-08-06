import { EuiTextArea } from '@elastic/eui'
import Browser from '../../utils/browser'

export default function TextAreaField({ value, onChange, rows=6,...props }: any) {
  const handleChange = event => {
    const value = Browser.inputValue(event)
    onChange(value)
  }

  return (
    <EuiTextArea
      fullWidth
      rows={rows}
      value={value ?? ''}
      onChange={handleChange}
      {...props}
    />
  )
}
