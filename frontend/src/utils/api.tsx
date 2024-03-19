import AxiosInstance from './axios'

async function getConfig() {
  return AxiosInstance.get('/config', { silent: true })
}

async function createTask(data: any) {
  return AxiosInstance.post('/tasks/submit-async', data, {
    message: 'Starting Task',
  })
}

async function createTaskAndGetResult(data: any) {
  return AxiosInstance.post('/tasks/submit-sync', data, { silent: true })
}

async function getTasks(page=1, per_page=100) {
  return AxiosInstance.get(`/tasks?with_results=false&sort_by_date=true&page=${page}&per_page=${per_page}`, {
    silent: true,
  })
}

async function getTask(task_id: number) {
  return AxiosInstance.get(`/tasks/${task_id}`, { silent: true })
}

async function abortTask(task_id: number, page) {
  return AxiosInstance.patch(`/tasks?return_tasks=true&page=${page}` , {
    action: 'abort',
    task_ids: [task_id]
  }, {
    message: 'Aborting...',
  })
}
async function deleteTask(task_id: number, page) {
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
async function downloadTaskResults(taskId, data = {}) {
  return AxiosInstance.post(`/tasks/${taskId}/download`, data, {
    responseType: 'blob',
    message: 'Downloading...',
  }).then(downloadViaLink)
}

async function getTaskResults(taskId, data = {}) {
  return AxiosInstance.post(`/tasks/${taskId}/results`, data, { silent: true })
}

const Api = {
  getConfig,
  createTask,
  createTaskAndGetResult,
  getTasks,
  getTask,
  deleteTask,
  abortTask,
  downloadTaskResults,
  getTaskResults,
}

export default Api
