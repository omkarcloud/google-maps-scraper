import {
  EuiButton,
  EuiEmptyPrompt,
  EuiImage,
  EuiPageTemplate,
} from '@elastic/eui'
import { useRouter } from 'next/router'

const NotFoundPage = () => {
  const illustration = '/images/404_rainy_cloud_light.png'

  const router = useRouter()

  const handleClick = e => {
    e.preventDefault()
    router.back()
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
              key="404-go-back">
              Go back
            </EuiButton>,
          ]}
          body={
            <p>
              Sorry, we can&apos;t find the page you&apos;re looking for. It
              might have been removed or renamed, or maybe it never existed.
            </p>
          }
          icon={<EuiImage alt="" size="fullWidth" src={illustration} />}
          layout="vertical"
          title={<h2>Page not found</h2>}
          titleSize="m"
        />
      </EuiPageTemplate.EmptyPrompt>
    </EuiPageTemplate>
  )
}

export default NotFoundPage
