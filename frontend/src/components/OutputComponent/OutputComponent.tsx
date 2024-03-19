import {
  EuiBadge,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiButton,
  EuiButtonEmpty,
  EuiLink,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiPagination,
  EuiText,
  formatDate,
} from '@elastic/eui'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Api from '../../utils/api'
import { TaskStatus } from '../../utils/models'
import { EmptyOutputs, EmptyScraper } from '../Empty/Empty'
import Toast from '../../utils/cogo-toast'
import ClickOutside from '../ClickOutside/ClickOutside'
import { isEmpty } from '../../utils/missc'
import CenteredSpinner from '../CenteredSpinner'

function convertLocalDateToUTCDate(date, toUTC) {
  date = new Date(date)
  const localOffset = date.getTimezoneOffset() * 60000
  const localTime = date.getTime()
  if (toUTC) {
    date = localTime + localOffset
  } else {
    date = localTime - localOffset
  }
  date = new Date(date)
  return date
}

const toTitleCase = str => {
  return str.replace(/_/g, ' ').replace(/\w\S*/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

// Function to get appropriate badge color for each status
const getBadgeColor = status => {
  switch (status) {
    case TaskStatus.PENDING:
      return 'default'
    case TaskStatus.IN_PROGRESS:
      return 'primary'
    case TaskStatus.COMPLETED:
      return 'success'
    case TaskStatus.FAILED:
    case TaskStatus.ABORTED:
      return 'danger'
    default:
      return 'default'
  }
}

function datetostring(date: any) {
  if (!date) {
    return ''

  }
  return formatDate(convertLocalDateToUTCDate(date, false), 'dateTime')
}


function getTaskString(task) {
  const onlyTaskName = `Task ${task.id}`
  if (isEmpty(task.task_name)) {
    return onlyTaskName
  } else if (onlyTaskName === task.task_name) {
    return onlyTaskName
  } else {
    return `Task ${task.id} (${task.task_name})`
  }

}

function timeToHumanReadable(seconds) {
  if (seconds === null) {
    return ''
  }
  if (seconds === 0) {
    return '0s'
  }
  else if (seconds <= 5) {
    const rst = `${seconds.toFixed(2)}s`
    if (rst.endsWith(".00s")) {
      return rst.replace(".00", "")
    }
    return rst
  }

  // remove decimals using bitwise
  seconds = ~~seconds

  if (seconds < 60) return `${seconds}s`

  let time = ''
  const days = Math.floor(seconds / 86400)
  seconds %= 86400
  const hours = Math.floor(seconds / 3600)
  seconds %= 3600
  const minutes = Math.floor(seconds / 60)
  seconds = seconds % 60

  if (days > 0) time += `${days}d `
  if (hours > 0) time += `${hours}h `
  if (minutes > 0) time += `${minutes}m `
  if (seconds > 0) {
    time += `${seconds}s`
  };

  return time.trim()
}



const TaskTable = ({ activePage, onPageClick, isLoading, total_pages, tasks, updateTasks }) => {
  const [taskToBeDeleted, setDeleteTask] = useState(null)

  const closeModal = () => {
    setDeleteTask(false)
  }
  const confirmDelete = (task) => {
    Api.deleteTask(task.id, activePage).then((response) => {
      Toast.success('Successfully Deleted Task')
      updateTasks(response.data, null)
    }).finally(() => {
      closeModal()
    })
  }


  const abortTask: (item: any) => void = (task) => {
    Api.abortTask(task.id, activePage).then((response) => {
      Toast.success('Successfully Aborted Task')
      updateTasks(response.data, null)
    })
  }

  const deleteTaskButtonClick: (item: any) => void = (task) => {
    setDeleteTask(task)
  }
  // Columns definition
  const columns: EuiBasicTableColumn<any>[] = [
    {
      field: 'id',
      name: 'View Task',
      render: id => {
        return (
          <Link href={`/output/${id}`} passHref>
            <EuiLink>{`View Task ${id.toString()}`}</EuiLink>
          </Link>
        )
      },

      // sortable: true,
    },
    {
      field: 'task_name',
      name: 'Task Name',
      // sortable: true,
    },
    {
      field: 'result_count',
      name: 'Result Count',
      // dataType: 'number',
      // sortable: true,
    },
    {
      field: 'status',
      name: 'Status',
      render: status => (
        <EuiBadge color={getBadgeColor(status)}>{toTitleCase(status)}</EuiBadge>
      ),

      // sortable: true,
    },
    {
      field: 'duration',
      name: 'Duration',
      render: (s) => timeToHumanReadable(s),

      // timeToHumanReadable
      // dataType: 'number',
      // sortable: true,
    },
    {
      field: 'started_at',
      name: 'Start Time',
      dataType: 'date',
      render: date => {
        return datetostring(date)
      },
      // sortable: true,
    },
    {
      field: 'finished_at',
      name: 'Finish Time',
      dataType: 'date',
      render: date => datetostring(date),
      // sortable: true,
    },
    {
      name: 'Actions',
      actions: [
        {
          name: 'Abort',
          description: 'Abort the Task',
          icon: 'cross',
          type: 'icon',
          color: 'danger',
          onClick: abortTask,
        },
        {
          name: 'Delete',
          description: 'Delete the Task',
          icon: 'trash',
          type: 'icon',
          color: 'danger',
          onClick: deleteTaskButtonClick,
        },
      ],
    },
  ]
  return (
    <>
      {taskToBeDeleted && (
        <EuiModal onClose={closeModal}>
          <ClickOutside handleClickOutside={() => { closeModal() }}>
            <div>

              <EuiModalHeader>
                <EuiModalHeaderTitle>Confirm Delete</EuiModalHeaderTitle>
              </EuiModalHeader>
              <EuiModalBody>
                <EuiText>
                  Are you sure you want to delete <b>{getTaskString(taskToBeDeleted)}</b>?
                  The action is <b>irreversible</b>.
                </EuiText>
              </EuiModalBody>
              <EuiModalFooter>
                <EuiButtonEmpty onClick={closeModal}>Cancel</EuiButtonEmpty>
                <EuiButton color="danger" onClick={() => confirmDelete(taskToBeDeleted)}>
                  Delete
                </EuiButton>
              </EuiModalFooter>

            </div>
          </ClickOutside>
        </EuiModal>
      )}
      {isLoading ? (
        <CenteredSpinner />
      ) : (
        <>
          <EuiBasicTable
            hasActions={true}
            items={tasks}
            columns={columns}
            rowProps={item => ({
              className: 'pointer',
            })}
          />
          <EuiPagination
            aria-label={'Pagination'}
            style={{
              display: 'flex',
              justifyContent: 'end',
            }}
            pageCount={total_pages}
            activePage={activePage - 1}
            onPageClick={(x) => onPageClick(x)}
          />
        </>
      )}


    </>

  )
}

const OutputComponent = ({ scrapers, tasks: taskResponse }) => {

  const [state, setState] = useState({ ...taskResponse, active_page: 1 })
  const [isLoading, setLoading] = useState(false)
  const total_pages = state.total_pages
  const results = state.results
  const active_page = state.active_page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Api.getTasks(active_page)
        setState((x) => ({ ...data, active_page: x.active_page > data.total_pages ? 1 : x.active_page }))
      } catch (error) {
        console.error('Failed to fetch tasks:', error)
        // Handle the error appropriately
      }
    }

    const intervalId = setInterval(fetchData, 1000)

    return () => clearInterval(intervalId)
  }, [
    active_page
  ])

  function updateState(data, current_page) {
    setState((curr) => {
      if (current_page === null) {
        return ({ ...curr, ...data, active_page: curr.active_page > data.total_pages ? 1 : curr.active_page })
      }
      return ({ ...data, active_page: current_page > data.total_pages ? 1 : current_page })
    })
  }

  const onPageChange = x => {
    async function fetchData() {
      setLoading(true)
      const data = (await Api.getTasks(x)).data
      updateState(data, x)
      setLoading(false)

    }
    fetchData()
  }

  if (!scrapers || scrapers.length === 0) {
    return <EmptyScraper />
  }

  if (results && results.length === 0) {
    return <EmptyOutputs />
  }
  return (
    <TaskTable activePage={active_page} onPageClick={x => onPageChange(x + 1)} isLoading={isLoading} total_pages={total_pages} tasks={results} updateTasks={updateState} />
  )
}

export default OutputComponent
