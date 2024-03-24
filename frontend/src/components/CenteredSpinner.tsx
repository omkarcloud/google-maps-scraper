import { EuiLoadingSpinner } from '@elastic/eui'

export default function CenteredSpinner({ addMargin = false }) {
  return (
    <div
      className={addMargin ? 'mt-48' : ''}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}>
      <EuiLoadingSpinner size="xxl" />
    </div>
  )
}
