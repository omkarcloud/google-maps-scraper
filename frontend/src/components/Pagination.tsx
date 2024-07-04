import { EuiPagination } from '@elastic/eui'
import SingleSelect from './inputs/SingleSelect'

export function Pagination({ total_pages, activePage, onPageClick }) {
  if (total_pages <= 7) {
    return <EuiPagination
      aria-label={'Pagination'}
      style={{
        display: 'flex',
        justifyContent: 'end',
      }}
      pageCount={total_pages}
      activePage={activePage}
      onPageClick={(x) => onPageClick(x)} />
  } else {
    const options = []
    for (let i = 1; i <= total_pages; i++) {
      options.push({ value: i.toString(), label: i.toString() })
    }
    return (
      <div className='flex justify-end mt-4'>
        <SingleSelect
          isClearable={false}
          compressed

          style={{ maxWidth: '90px' }}
          name={'pagination'}
          options={options}
          value={(activePage + 1).toString()}
          onChange={(value) => {
            return onPageClick(parseInt(value) - 1)
          }} />
      </div>
    )

  }
}
