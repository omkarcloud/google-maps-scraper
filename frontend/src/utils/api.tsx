import AxiosInstance from './axios'

function getConfig() {
  return AxiosInstance.get('/config', { silent: true })
}

function createTask(data: any) {
  return AxiosInstance.post('/tasks/submit-async', data, {
    message: 'Starting Task',
  })
}

function createTaskAndGetResult(data: any) {
  return AxiosInstance.post('/tasks/submit-sync', data, { silent: true })
}


function isApiRunning() {
  return AxiosInstance.get(null, { silent: true, silenceError:true  })
}

function getTasks(page=1, per_page=100) {
  return AxiosInstance.get(`/tasks?with_results=false&sort_by_date=true&page=${page}&per_page=${per_page}`, {
    silent: true,
    silenceError:true,
  })
}

function isAnyTaskFinished(task_ids, all_tasks) {
  return AxiosInstance.post(`/tasks/is-any-task-finished`, {
    task_ids: task_ids, 
    all_tasks: all_tasks
  },  {
    silent: true,
    silenceError:true,
  })
}
function isTaskUpdated(taskId, lastUpdated, status) {
  return AxiosInstance.get(`/tasks/is-task-updated?task_id=${taskId}&last_updated=${encodeURIComponent(lastUpdated)}&status=${status}`, {
    silent: true,
    silenceError: true,
  });
}


function getTask(task_id: number) {
  return AxiosInstance.get(`/tasks/${task_id}`, { silent: true,  })
}

function abortTask(task_id: number, page) {
  return AxiosInstance.patch(`/tasks?return_tasks=true&page=${page}` , {
    action: 'abort',
    task_ids: [task_id]
  }, {
    message: 'Aborting...',
  })
}
function deleteTask(task_id: number, page) {
  return AxiosInstance.patch(`/tasks?return_tasks=true&page=` + page, {
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

function getTaskResults(taskId, data = {}) {
  return AxiosInstance.post(`/tasks/${taskId}/results`, data, { silent: true , silenceError:true,})
}

const Api = {
  isApiRunning,
  isAnyTaskFinished,
  isTaskUpdated,
  getConfig,
  createTask,
  createTaskAndGetResult,
  getTasks,
  deleteTask,
  abortTask,
  downloadTaskResults,
  getTaskResults,
}

export default Api
