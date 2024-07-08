import AxiosInstance, {baseUrl} from './axios'


async function getConfig() {
  const res = await fetch(`${baseUrl}/ui/config`)

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }

  const data = await res.json()
  return data
}


function createTask(data: any) {
  return AxiosInstance.post('/tasks/create-task-async', data, {
    message: 'Starting Task',
  })
}

function createTaskAndGetResult(data: any) {
  return AxiosInstance.post('/tasks/create-task-sync', data, { silent: true })
}


function isApiRunning() {
  return AxiosInstance.get(null, { silent: true, silenceError:true  })
}

function getTasks(page=1) {
  return AxiosInstance.get(`/ui/tasks?page=${page}`, {
    silent: true,
    silenceError:true,
  })
}

function isAnyTaskFinished(pending_task_ids, progress_task_ids,  all_tasks) {
  return AxiosInstance.post(`/ui/tasks/is-any-task-updated`, {
    pending_task_ids,
    progress_task_ids,
    all_tasks,
  },  {
    silent: true,
    silenceError:true,
  })
}
function isTaskUpdated(taskId, lastUpdated, status) {
  return AxiosInstance.post(`/ui/tasks/is-task-updated`, {
    task_id: taskId,
    last_updated: lastUpdated,
    status: status,
  }, {
    silent: true,
    silenceError: true,
  });
}



function abortTask(task_id: number, page) {
  return AxiosInstance.patch(`/ui/tasks?page=${page}` , {
    action: 'abort',
    task_ids: [task_id]
  }, {
    message: 'Aborting...',
  })
}
function deleteTask(task_id: number, page) {
  return AxiosInstance.patch(`/ui/tasks?page=` + page, {
    action: 'delete',
    task_ids: [task_id]
  }, {
    message: 'Deleting...',
  })
}

function downloadViaLink(response) {
  const filename = response.headers['content-disposition']
    .split('filename=')[1]
    .replace(/['"]/g, '')

  const url = window.URL.createObjectURL(new Blob([response.data]))
  // create a link element
  const link = document.createElement('a')
  // set the link's href to the URL created above
  link.href = url
  // set the link's download attribute to the desired file name
  link.setAttribute('download', filename)
  // append the link to the body and trigger the download
  document.body.appendChild(link)
  link.click()
  link.remove()
}
function downloadTaskResults(taskId, data = {}) {
  return AxiosInstance.post(`/tasks/${taskId}/download`, data, {
    responseType: 'blob',
    message: 'Downloading...',
  }).then(downloadViaLink)  
}

function getTaskResults(taskId, data = {}, force_apply_first_view = false, signal=undefined) {
  return AxiosInstance.post( force_apply_first_view ?`/ui/tasks/${taskId}/results?force_apply_first_view=${force_apply_first_view}` :`/ui/tasks/${taskId}/results` , data, { silent: true , silenceError:true, signal:signal})
}

const Api = {
  getConfig, 
  isApiRunning,
  isAnyTaskFinished,
  isTaskUpdated,
  createTask,
  createTaskAndGetResult,
  getTasks,
  deleteTask,
  abortTask,
  downloadTaskResults,
  getTaskResults,
}

export default Api
