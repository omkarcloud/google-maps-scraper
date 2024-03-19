import { EuiButton } from '@elastic/eui'

const RunStickyBar = () => (
  <div
    style={{
      position: 'sticky',
      bottom: 0,
      backgroundColor: '#f5f5f5',
      padding: '10px',
    }}>
    <EuiButton fill>Run</EuiButton>
  </div>
)

export default RunStickyBar
