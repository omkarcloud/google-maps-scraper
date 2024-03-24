import { EuiComboBox } from '@elastic/eui'

export default function SingleSelect({
  options,
  value,
  onChange,
  ...props
}: any) {
  let selected = options.find(x => x.value === value)
  if (!selected && value) {
    selected = { value, label: value }
  }

  return (
    <EuiComboBox
      isClearable={true}
      {...props}
      options={options}
      selectedOptions={selected ? [selected] : []}
      onChange={option => {
        const change = option.length === 0 ? null : option[0].value
        onChange(change)
      }}
      singleSelection={{ asPlainText: true }}
    />
  )
}
