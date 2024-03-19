import {
  EuiButton,
  EuiEmptyPrompt,
  EuiImage,
  EuiPageTemplate,
} from '@elastic/eui'
import { useRouter } from 'next/router'
import { pushToHome } from '../utils/next'

const NotFoundPage = () => {
  const illustration = '/images/twitter-card.png'

  const router = useRouter()

  const handleClick = e => {
    e.preventDefault()
    pushToHome(router)
  }

  return (
    <EuiPageTemplate>
      <EuiPageTemplate.EmptyPrompt>
        <EuiEmptyPrompt
          actions={[
            <EuiButton
              color="primary"
              fill
              onClick={handleClick}
              key="work-in-progress-go-home">
              Go Home
            </EuiButton>,
          ]}
          body={
            <p>
              This page is still under development. Please check back later for
              more information.
            </p>
          }
          icon={<EuiImage alt="" size="fullWidth" src={illustration} />}
          layout="vertical"
          title={<h2>Work in Progress</h2>}
          titleSize="m"
        />
      </EuiPageTemplate.EmptyPrompt>
    </EuiPageTemplate>
  )
}

export default NotFoundPage
