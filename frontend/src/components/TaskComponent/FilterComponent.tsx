import { EuiButton, EuiFormRow } from '@elastic/eui'
import { useState } from 'react'
import CheckboxField from '../inputs/CheckBoxField'
import MultiSelect from '../inputs/MultiSelect'
import NumberField from '../inputs/NumberField'
import SearchField from '../inputs/SearchField'
import SingleSelect from '../inputs/SingleSelect'

const NumericInputWithLabel = ({ label, value, onChange }) => {
  return (
    <EuiFormRow fullWidth label={label}>
      <NumberField value={value} onChange={onChange} fullWidth />
    </EuiFormRow>
  )
}

const CheckboxWithLabel = ({ label, value, onChange }) => {
  return (
    <EuiFormRow fullWidth label={label}>
      <CheckboxField fullWidth value={value} onChange={onChange} />
    </EuiFormRow>
  )
}

const SingleSelectWithLabel = ({ label, value, onChange, options }) => {
  return (
    <EuiFormRow fullWidth label={label}>
      <SingleSelect
        fullWidth
        options={options}
        value={value}
        onChange={onChange}
      />
    </EuiFormRow>
  )
}

const MultiSelectWithLabel = ({ label, value, onChange, options }) => {
  return (
    <EuiFormRow fullWidth label={label}>
      <MultiSelect
        fullWidth
        options={options}
        value={value}
        onChange={onChange}
      />
    </EuiFormRow>
  )
}

const TextFieldWithLabel = ({ label, value, onChange }) => {
  return (
    <EuiFormRow fullWidth label={label}>
      <SearchField
        fullWidth
        onApply={onChange}
        value={value}
        onChange={onChange}
      />
    </EuiFormRow>
  )
}

export const FilterComponent = ({
  filter_data,
  setFilter: handleFilterChange,
  filters,
}) => {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div>
      {showFilters ? (
        <EuiButton
          className="mb-4"
          onClick={() => setShowFilters(false)}
          size="s">
          {' '}
          Hide Filters{' '}
        </EuiButton>
      ) : (
        <EuiButton onClick={() => setShowFilters(true)} size="s">
          {' '}
          Show Filters{' '}
        </EuiButton>
      )}

      {showFilters &&
        filters.map(({ id, type, label, options }) => {
          switch (type) {
            case 'MinNumberInput':
            case 'MaxNumberInput':
              return (
                <NumericInputWithLabel
                  key={id}
                  label={label}
                  value={filter_data[id]}
                  onChange={v => handleFilterChange(id, v)}
                />
              )
            case 'IsTrueCheckbox':
            case 'IsFalseCheckbox':
            case 'IsNullCheckbox':
            case 'IsNotNullCheckbox':
            case 'IsTruthyCheckbox':
            case 'IsFalsyCheckbox':
              return (
                <CheckboxWithLabel
                  key={id}
                  label={label}
                  value={filter_data[id]}
                  onChange={v => handleFilterChange(id, v)}
                />
              )
            case 'SingleSelectDropdown':
              return (
                <SingleSelectWithLabel
                  key={id}
                  label={label}
                  value={filter_data[id]}
                  options={options}
                  onChange={value => handleFilterChange(id, value)}
                />
              )
            case 'MultiSelectDropdown':
              return (
                <MultiSelectWithLabel
                  key={id}
                  label={label}
                  value={filter_data[id] ?? []}
                  options={options}
                  onChange={value => {
                    return handleFilterChange(id, value)
                  }}
                />
              )
            case 'SearchTextInput':
              return (
                <TextFieldWithLabel
                  key={id}
                  label={label}
                  value={filter_data[id]}
                  onChange={v => handleFilterChange(id, v)}
                />
              )
            default:
              throw Error('Not Implemented')
          }
        })}
    </div>
  )
}
