import { EuiFormRow } from '@elastic/eui'
import ChooseField from '../inputs/ChooseField'
import SingleSelect from '../inputs/SingleSelect'

export const SortComponent = ({ sort, setSort, sorts }) => {
  // Convert sorts to the format expected by TabsComponent
  const sortTabs = [
    { value: '', label: 'No Sort' }, // "Don't Sort" option
    ...sorts.map(({ id, label }) => ({
      value: id,
      label,
    })),
  ]

  if (sortTabs.length <= 3) {
    return (
      <ChooseField
        color={null}
        value={sort}
        options={sortTabs}
        onChange={setSort}
      />
    )
  } else {
    sortTabs[0] =     { value: '', label: "Don't Sort" }
    return <EuiFormRow
      className="row-label-auto"
      label="Sort"
      display="columnCompressed"
      fullWidth>
      <div className="ml-4">
        <SingleSelect 
          style={{ maxWidth: '300px' }}
          name={'sort'}
          options={sortTabs}
          value={sort}
          onChange={setSort}
        />

      </div>
    </EuiFormRow>
  }

}
