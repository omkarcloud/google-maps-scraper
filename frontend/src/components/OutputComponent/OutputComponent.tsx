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
  EuiText,
  formatDate,
} from '@elastic/eui'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Api from '../../utils/api'
import { TaskStatus, filterAndMapAllTasks, filterIsPendingTasks, filterIsProgressTasks, } from '../../utils/models'
import { EmptyOutputs, EmptyScraper } from '../Empty/Empty'
import Toast from '../../utils/cogo-toast'
import ClickOutside from '../ClickOutside/ClickOutside'
import { isEmpty } from '../../utils/missc'
import CenteredSpinner from '../CenteredSpinner'
import Description from '../../components/Description/Description'
import Tabs, { TabsId } from '../../components/PagesTabs/PagesTabs'
import {
  OutputContainer,
  OutputTabsContainer,
  TabWrapper,
} from '../../components/Wrappers'
import ServerStatusComponent from '../../components/ServerStatusComponent'
import { Pagination } from '../Pagination'

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


function calculateDuration(obj) {
  if (obj.started_at) {
    // Convert datetime strings to Date objects
    const startedAt = new Date(obj.started_at)
    const endTime = obj.finished_at ? new Date(obj.finished_at) : convertLocalDateToUTCDate(new Date(), true)
    // @ts-ignore
    const duration = (endTime - startedAt) / 1000

    if (duration === 0) {
      return 0
    }

    return duration
  } else {
    return null
  }
}

const DurationComponent = ({ task }) => {
  const [duration, setDuration] = useState(calculateDuration(task))

  useEffect(() => {
    const isExecuting = task.status === TaskStatus.IN_PROGRESS
    if (isExecuting) {
      const interval = setInterval(() => {
        setDuration(calculateDuration(task))
      }, 1000) // Update duration every 1 second

      return () => clearInterval(interval) // Clear interval on component unmount
    }

  }, [task]) // Dependency array includes task to recalculate if task changes

  return <>{timeToHumanReadable(duration)}</>
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
      render: (s, record) => {
        return <DurationComponent task={record} />
      },

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
          <Pagination {...{ total_pages, activePage: activePage - 1, onPageClick }} />
        </>
      )}


    </>

  )
}


const OutputComponent = (props) => {
  const { scrapers, tasks: taskResponse } = props

  const [state, setState] = useState({ ...taskResponse, active_page: 1 })
  const [isLoading, setLoading] = useState(false)
  const total_pages = state.total_pages
  const results = state.results
  const active_page = state.active_page

  useEffect(() => {
    const pendingTsks = filterIsPendingTasks(results)
    const progressTsks = filterIsProgressTasks(results)
    const hasTasks = pendingTsks.length > 0 || progressTsks.length > 0
    if (!isLoading && hasTasks) {
      const isCleared = { isCleared: false } // Initialize as an object with isCleared property
      const intervalId = setInterval(async () => {
        if (!isCleared.isCleared) { // Access the isCleared property
          const all_tasks = filterAndMapAllTasks(pendingTsks.concat(progressTsks))
          const response = await Api.isAnyTaskFinished(pendingTsks.map(task => task.id), progressTsks.map(task => task.id), all_tasks)
          if (response.data.result && !isCleared.isCleared) {
            const { data } = await Api.getTasks(active_page)
            if (!isCleared.isCleared) { // Access the isCleared property
              setState((x) => ({ ...data, active_page: x.active_page > data.total_pages ? 1 : x.active_page }))
            }
          }
        }
      }, 1000)
      return () => {
        isCleared.isCleared = true // Set the isCleared property to true
        return clearInterval(intervalId)
      }
    }
  }, [isLoading, results, active_page])


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
  let cp
  if (!scrapers || scrapers.length === 0) {
    cp = <EmptyScraper />
  }

  else if (results && results.length === 0) {
    cp = <EmptyOutputs />
  } else {

    cp = <TaskTable activePage={active_page} onPageClick={x => onPageChange(x + 1)} isLoading={isLoading} total_pages={total_pages} tasks={results} updateTasks={updateState} />
  }
  return <> <OutputTabsContainer>
    <ServerStatusComponent />
    <Description {...props} />
    <Tabs onTabChange={(id) => {
      if (id === TabsId.OUTPUT) {
        onPageChange(1)
      }
    }} initialSelectedTab={TabsId.OUTPUT} />
  </OutputTabsContainer>
    <OutputContainer>
      <TabWrapper>
        {cp}
      </TabWrapper>
    </OutputContainer>
  </>
}

export default OutputComponent
