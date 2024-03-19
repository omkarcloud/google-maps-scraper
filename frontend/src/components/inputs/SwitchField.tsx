import { EuiSwitch, useGeneratedHtmlId } from '@elastic/eui'

export default function SwitchField({ value, onChange, ...props }: any) {
  const handleSwitchChange = event => {
    const value = event.target.checked
    onChange(value)
  }

  const id = useGeneratedHtmlId()
  return (
    <EuiSwitch
      {...props}
      id={id}
      label={''}
      showLabel={false}
      checked={!!value}
      onChange={handleSwitchChange}
    />
  )
}
