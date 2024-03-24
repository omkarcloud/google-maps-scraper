import { EuiSelect } from '@elastic/eui'
import Browser from '@omkar111111/utils/browser'

export default function Select({ options, value, onChange, ...props }: any) {
  const cleanedOptions = options.map(o => ({
    value: o.value,
    text: o.label,
  }))

  const selected = cleanedOptions.find(x => x.value === value)
  const selectedValue = selected?.value

  return (
    <EuiSelect
      {...props}
      fullWidth
      options={cleanedOptions}
      value={value}
      onChange={e => {
        const change = Browser.inputValue(e)
        if (selectedValue !== change) {
          onChange(change)
        }
      }}
    />
  )
}
