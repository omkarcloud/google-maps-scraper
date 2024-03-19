import { EuiCheckbox, useGeneratedHtmlId } from '@elastic/eui'

export default function CheckboxField({ value, onChange, ...props }: any) {
  const handleNumberChange = event => {
    const value = event.target.checked
    onChange(value)
  }

  const id = useGeneratedHtmlId()
  return (
    <EuiCheckbox
      {...props}
      id={id}
      checked={!!value}
      onChange={handleNumberChange}
    />
  )
}
