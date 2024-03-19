import { EuiText } from '@elastic/eui'

const Description = ({ description }) => {
  return (
    <EuiText size="m">
      <p>{description}</p>
    </EuiText>
  )
}

export default Description
