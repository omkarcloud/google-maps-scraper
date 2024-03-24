import { EuiDataGrid, EuiLink } from '@elastic/eui'

function createColumns(fields) {
  return fields.map(({ key, label }) => ({
    id: key,
    display: label,
  }))
}
function isValidLink(string) {
  try {
    new URL(string);
    return true;
  } catch (error) {
    return false;
  }
}
function isLink(value) {
  return (
    typeof value === 'string' &&
    (value.startsWith('http://') || value.startsWith('https://')) && isValidLink(value)
  )
}

const DataPanel = ({ response, fields }) => {
  const slicedData = response.results

  const columns = createColumns(fields)

  return (
    <EuiDataGrid
      aria-label="Data Grid"
      columnVisibility={{
        visibleColumns: columns.map(({ id }) => id),
        setVisibleColumns: x => null,
      }}
      columns={columns}
      rowCount={slicedData.length}
      renderCellValue={({ rowIndex, columnId }) => {
        const el = slicedData[rowIndex]
        const value = el[columnId]

        // Check if value is a boolean and render "True" or "False"
        if (typeof value === 'boolean') {
          return value ? 'True' : 'False'
        }

        if (isLink(value)) {
          return (
            <EuiLink target={'_blank'} href={value}>
              {value}
            </EuiLink>
          )
        }

        if (
          (typeof value === 'object' && value !== null) ||
          Array.isArray(value)
        ) {
          // Stringify the value
          return JSON.stringify(value)
        }

        return value ?? null
      }}
      toolbarVisibility={{
        showColumnSelector: false,
        showSortSelector: false,
        showFullScreenSelector: true,
        showDisplaySelector: true,
      }}
    />
  )
}

export default DataPanel
