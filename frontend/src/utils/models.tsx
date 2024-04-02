
export const TaskStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
  ABORTED: 'aborted',
}


export function isDoing(task) {
  return (
    task.status === TaskStatus.IN_PROGRESS || task.status === TaskStatus.PENDING
  )
}


export function filterIsDoingTasks(tasks: any[]) {
  return tasks.filter(isDoing)
}