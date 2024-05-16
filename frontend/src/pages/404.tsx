import {
  EuiButton,
  EuiEmptyPrompt,
  EuiImage,
  EuiPageTemplate,
} from '@elastic/eui'

function NotFoundPage(props) {
  const illustration = '/images/404_rainy_cloud_light.png'

  return (
    <EuiPageTemplate>
      <EuiPageTemplate.EmptyPrompt>
        <EuiEmptyPrompt
          actions={[
            <EuiButton
              color="primary"
              fill
              href='/'
              key="404-go-back">
              Go Home
            </EuiButton>,
          ]}
          body={<p>{`Sorry, we can't find the page you're looking for. It might have been removed or renamed, or maybe it never existed.`}</p>}
          icon={<EuiImage alt="" size="fullWidth" src={illustration} />}
          layout="vertical"
          title={<h2>Page not found</h2>}
          titleSize="m" />
      </EuiPageTemplate.EmptyPrompt>
    </EuiPageTemplate>
  )
}

export default NotFoundPage
