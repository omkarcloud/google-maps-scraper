import { EuiLink, EuiPagination } from '@elastic/eui'
import { useEffect, useRef, useState } from 'react'
import Api from '../../utils/api'
import { isEmpty, isEmptyObject } from '../../utils/missc'
import { TaskStatus } from '../../utils/models'
import CenteredSpinner from '../CenteredSpinner'
import DownloadStickyBar from '../DownloadStickyBar/DownloadStickyBar'
import {
  EmptyAborted,
  EmptyFailed,
  EmptyFilterResults,
  EmptyInProgress,
  EmptyPending,
  EmptyResults,
} from '../Empty/Empty'
import {
  Container,
  OutputContainerWithBottomPadding,
  OutputTabsContainer,
} from '../Wrappers'
import DataPanel from './DataPanel'
import { FilterComponent } from './FilterComponent'
import { SortComponent } from './SortComponent'
import { ViewComponent } from './ViewComponent'
import Link from 'next/link'

function sentenceCase(string) {
  // Convert a string into Sentence case.
  if (!string) {
    return ''
  }
  // Add space between separators and numbers
  string = string
    .split(/([\W_\d])/)
    .filter(s => s)
    .join(' ')
  // Remove separators (except numbers)
  string = string.replace(/[\W_]/g, ' ').split(/\s+/).join(' ')
  // Manage capital letters and capitalize the first character
  return string
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/^\w/, c => c.toUpperCase())
}

function titleCase(string) {
  // Convert a string into Title Sentence Case.
  if (!string) {
    return ''
  }
  return sentenceCase(string)
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function isDoing(task) {
  return (
    task.status === TaskStatus.IN_PROGRESS || task.status === TaskStatus.PENDING
  )
}

function clean_filter_data(filter_data, filters) {
  const cleanedFilterData = { ...filter_data } // Create a copy to modify

  for (const filter of filters) {
    const filterKey = filter.id
    // Special handling for MultiSelectDropdown type filters
    if (filter.type === 'MultiSelectDropdown') {
      const filterValue = cleanedFilterData[filter.id]
      if (filterKey in cleanedFilterData) {
        // If the value's length is 0, delete the filter entry from cleanedData
        if (filterValue.length === 0) {
          delete cleanedFilterData[filter.id]
        } else {
          const dt = filterValue.map(option => option.value)
          // Map the value to extract the id for each selected option
          cleanedFilterData[filter.id] = dt
        }
      }
    }
  }

  return cleanedFilterData
}

function isNullishObject(obj) {
  if (isEmptyObject(obj)) {
    return true
  }
  for (const key in obj) {
    if (obj[key] === false || isEmpty(obj[key])) {
      return true
    }
  }
  return false
}

function caseFields(fieldNames) {
  return fieldNames.map(({ key }) => ({
    key,
    label: titleCase(key),
  }))
}

function determineFields(results) {
  // Check if the results array is empty
  if (!results || results.length === 0) {
    return [] // Return an empty array if there are no results
  }

  return Object.keys(results[0]).map(fieldName => ({
    key: fieldName,
  }))
}

const TaskComponent = ({
  sorts,
  filters,
  views,
  default_sort,
  response: initialResponse,
  taskId,
}) => {
  const [response, setResponse] = useState(initialResponse)
  const defaultView = views.length > 0 ? views[0].id : null

  const [sort, setSort] = useState(default_sort || '')
  const [pageAndView, setPageAndView] = useState({
    currentPage: 0,
    view: defaultView,
    filter_data: {},
  })
  const [loading, setLoading] = useState(false)
  const filter_data = pageAndView.filter_data

  const onDownload = data => {
    const params = {
      sort,
      filters: clean_filter_data(filter_data, filters),
      view: pageAndView.view,
      ...data,
    }
    Api.downloadTaskResults(taskId, params)
  }

  const mountedRef = useRef(false)

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    const fetchData = async () => {
      setLoading(true)
      try {
        const per_page_records = 25
        const params = {
          sort,
          filters: clean_filter_data(filter_data, filters),
          view: pageAndView.view,
          offset: pageAndView.currentPage * per_page_records,
          limit: per_page_records,
        }
        const { data } = await Api.getTaskResults(taskId, params)
        setResponse(data)
      } catch (error) {
        console.error('Failed to fetch task:', error)
      }
      setLoading(false)
    }

    fetchData()
  }, [taskId, sort, filter_data, pageAndView.view, pageAndView.currentPage])

  useEffect(() => {
    const isExecuting = isDoing(response.task) // Assuming isDoing is a function to check task status

    if (isExecuting) {
      const fetchData = async () => {
        try {
          const per_page_records = 25
          const params = {
            sort,
            filters: clean_filter_data(filter_data, filters),
            view: pageAndView.view,
            offset: pageAndView.currentPage * per_page_records,
            limit: per_page_records,
          }
          const { data } = await Api.getTaskResults(taskId, params)
          if ((pageAndView.currentPage + 1) > data.page_count) {
            setPageAndView((x) => ({ ...x, currentPage: 0 }))
          }
          setResponse(data)
        } catch (error) {
          console.error('Failed to fetch task:', error)
        }
      }

      const intervalId = setInterval(fetchData, 1000) // Polling every 1000 milliseconds
      return () => clearInterval(intervalId)
    }
  }, [taskId, response.task.status, sort, filter_data, pageAndView.view, pageAndView.currentPage])

  let selectedFields =
    pageAndView.view === '__all_fields__'
      ? determineFields(response.results)
      : views.find(v => v.id === pageAndView.view)?.fields ?? null
  if (selectedFields) {
    selectedFields = caseFields(selectedFields)
  }

  const handlePageClick = page => {
    setPageAndView(prev => ({ ...prev, currentPage: page }))
  }

  const handleViewSet = view => {
    setPageAndView((x) => ({ ...x, view, currentPage: 0 }))
  }

  const hasResults = !!response.count
  const showPagination = hasResults && response.page_count > 1

  const isResultsNotArray = !Array.isArray(response.results)
  if (isResultsNotArray) {
    switch (response.task.status) {
      case TaskStatus.PENDING:
        return (
          <Container>
            <EmptyPending />
          </Container>
        )
      case TaskStatus.IN_PROGRESS:
        return (
          <Container>
            <EmptyInProgress />
          </Container>
        )
      case TaskStatus.FAILED:
        return (
          <Container>
            <EmptyFailed error={response.results} />
          </Container>
        )
      case TaskStatus.ABORTED:
        return (
          <Container>
            <EmptyAborted />
          </Container>
        )
      default:
        break
    }
  }

  const setFilter = (id, value) => {
    setPageAndView((prev) => ({
      ...prev,
      filter_data: {
        ...prev.filter_data,
        [id]: value,
      },
    }))
  }
  return (
    <>
      <OutputTabsContainer>
        <div className='space-y-6 '>
        <Link href={`/output`} passHref>
              <EuiLink>View All Tasks</EuiLink>
            </Link>
          {filters.length ? (
            <FilterComponent
              filter_data={filter_data}
              setFilter={setFilter}
              filters={filters}
            />
          ):null}

          {sorts.length ? (
            <SortComponent sort={sort} setSort={setSort} sorts={sorts} />
          ) : null}
        </div>

        <div className="pb-6 pt-2">
          <ViewComponent
            view={pageAndView.view}
            setView={handleViewSet}
            views={views}
          />
        </div>
      </OutputTabsContainer>
      <OutputContainerWithBottomPadding>
        {loading ? (
          <CenteredSpinner></CenteredSpinner>
        ) : hasResults ? (
          <>
            <DataPanel response={response} fields={selectedFields} />
            {showPagination ? (
              <EuiPagination
                aria-label="Pagination"
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                }}
                pageCount={response.page_count}
                activePage={pageAndView.currentPage}
                onPageClick={handlePageClick}
              />
            ) : (
              <div />
            )}
            {
              <DownloadStickyBar
                showPagination={showPagination}
                onDownload={onDownload}
              />
            }
          </>
        ) : (
          <>
            {isNullishObject(filter_data) ? (
              <EmptyResults />
            ) : (
              <EmptyFilterResults />
            )}
          </>
        )}
      </OutputContainerWithBottomPadding>
    </>
  )
}

export default TaskComponent
