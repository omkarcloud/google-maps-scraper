import { EuiFormRow } from '@elastic/eui'
import ChooseField from '../inputs/ChooseField'
import SingleSelect from '../inputs/SingleSelect'

export const SortComponent = ({ sort, setSort, sorts }) => {
  // Convert sorts to the format expected by TabsComponent
  const sortTabs = [
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
        onChange={x=> {
          if (x === null) {
            return setSort('no_sort')
          }else{
            return setSort(x)
          }
        }}
      />
    )
  } else {
    return <EuiFormRow
      className="row-label-auto"
      label="Sort"
      display="columnCompressed"
      fullWidth>
      <div className="ml-4">
        <SingleSelect 
          isClearable={false}
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
