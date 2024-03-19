import {
  EuiButton,
  EuiButtonIcon,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui'

const ListOfTextFields = ({ value, onChange, placeholder , disabled, title}) => {
  const handleFieldChange = (index, newValue) => {
    const updatedValue = value.map((item, i) => (i === index ? newValue : item))
    onChange(updatedValue)
  }

  const handleRemoveField = index => {
    const updatedValue = value.filter((_, i) => i !== index)
    onChange(updatedValue)
  }

  const handleAddField = () => {
    onChange([...value, '']) // Add an empty string as a new field
  }

  return (
    <div  >
      <div  className={value.length ? 'mb-3' : undefined}>
        {value.map((item, index) => (
          <EuiFlexGroup key={index} alignItems="center">
            <EuiFlexItem>
              <EuiFieldText
              title={title} 
                disabled={disabled}
                placeholder={placeholder}
                value={item}
                onChange={e => handleFieldChange(index, e.target.value)}
                fullWidth
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonIcon
              title={title} 
              disabled={disabled}
                aria-label="Remove field"
                iconType="cross"
                color="danger"
                onClick={() => handleRemoveField(index)}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        ))}
      </div>
      <EuiButton title={title}  disabled={disabled} onClick={handleAddField} iconType="plusInCircle">
        Add Field
      </EuiButton>
    </div>
  )
}

export default ListOfTextFields
