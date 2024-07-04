import {
  EuiButton,
  EuiCodeBlock,
  EuiDescriptionListDescription,
  EuiEmptyPrompt,
  EuiImage,
  EuiLink,
} from '@elastic/eui'
import Link from 'next/link'
import CenteredSpinner from '../CenteredSpinner'


function OutputLink() {
  return <Link href={`/output`} passHref>
    <EuiLink>View All Tasks</EuiLink>
  </Link>
}


export const EmptyInputs = props => {
  return (
    <div style={{ padding: '80px 0', textAlign: 'center' }}>
      <EuiEmptyPrompt
        icon={
          <EuiImage
            style={{ maxWidth: '100px', margin: 'auto' }}
            size="fullWidth"
            src={'/images/mascot.png'}
            alt=""
          />
        }
        body={
          <p>
            Learn how to add inputs to your scraper by reading the Botasaurus
            docs{' '}
            <EuiLink
              target={'_blank'}
              href={'https://github.com/omkarcloud/botasaurus/'}>
              here
            </EuiLink>
            .{' '}
          </p>
        }
        color="subdued"
        layout="vertical"
        title={<h2>Add Inputs</h2>}
        titleSize="m"
      />
    </div>
  )
}

export const EmptyScraper = props => {
  return (
    <div style={{ padding: '80px 0', textAlign: 'center' }}>
      <EuiEmptyPrompt
        icon={
          <EuiImage
            style={{ maxWidth: '100px', margin: 'auto' }}
            size="fullWidth"
            src={'/images/mascot.png'}
            alt=""
          />
        }
        body={
          <p>
            Learn how to add scrapers by reading the Botasaurus docs{' '}
            <EuiLink
              target={'_blank'}
              href={'https://github.com/omkarcloud/botasaurus/'}>
              here
            </EuiLink>
            .{' '}
          </p>
        }
        color="subdued"
        layout="vertical"
        title={<h2>Add Scraper</h2>}
        titleSize="m"
      />
    </div>
  )
}

export const EmptyOutputs = props => {
  return (
    <div style={{ padding: '80px 0', textAlign: 'center' }}>
      <EuiEmptyPrompt
        icon={
          <EuiImage
            style={{ maxWidth: '100px', margin: 'auto' }}
            size="fullWidth"
            src={'/images/mascot.png'}
            alt=""
          />
        }
        body={
          <p>Go to the Input Tab, run your scraper, to see the outputs. </p>
        }
        color="subdued"
        layout="vertical"
        title={<h2>No Output Yet!</h2>}
        titleSize="m"
      />
    </div>
  )
}

export const EmptyResults = props => {
  return (
    <div style={{ padding: '80px 0', textAlign: 'center' }}>
      <EuiEmptyPrompt
        style={{ width: '768px' }}
        icon={
          <EuiImage
            alt=""
            size="fullWidth"
            src="https://eui.elastic.co/images/272fd34bc8c628321e02-no-results--light.svg"
            srcSet="https://eui.elastic.co/images/272fd34bc8c628321e02-no-results--light.svg 1x, undefined 2x"
          />
        }
        body={
          <>
            <EuiDescriptionListDescription>
              Try running your scraper with different inputs.
            </EuiDescriptionListDescription>

            <Link href="/" passHref>
              <EuiButton className="mt-4" fill>
                Go to Input
              </EuiButton>
            </Link>
          </>
        }
        color="subdued"
        layout="horizontal"
        title={<h2>No results</h2>}
        titleSize="m"
      />
    </div>
  )
}

export const EmptyFilterResults = props => {
  return (
    <div style={{ padding: '80px 0', textAlign: 'center' }}>
      <EuiEmptyPrompt
        className="filter-prompt"
        icon={
          <EuiImage
            alt=""
            size="fullWidth"
            src="https://eui.elastic.co/images/272fd34bc8c628321e02-no-results--light.svg"
            srcSet="https://eui.elastic.co/images/272fd34bc8c628321e02-no-results--light.svg 1x, undefined 2x"
          />
        }
        body={
          <EuiDescriptionListDescription>
            Try adjusting your filters.
          </EuiDescriptionListDescription>
        }
        color="subdued"
        layout="horizontal"
        title={<h2>No results</h2>}
        titleSize="m"
      />
    </div>
  )
}

export const EmptyPending = () => {
  return (
    <div className='space-y-8' style={{ padding: '80px 0', textAlign: 'center' }}>
      <OutputLink/>
      <EuiEmptyPrompt
        body={
          <div>
            <p>The Task is pending to be executed.</p>
          </div>
        }
        color="subdued"
        layout="vertical"
        title={<h2>Pending</h2>}
        titleSize="m"
      />
    </div>
  )
}

export const EmptyInProgress = () => {
  return (
    <div className='space-y-8' style={{ padding: '80px 0', textAlign: 'center' }}>
      <OutputLink/>
      <EuiEmptyPrompt
        body={
          <div>
            <p>The Task is in progress.</p>
            <CenteredSpinner></CenteredSpinner>
          </div>
        }
        color="subdued"
        layout="vertical"
        title={<h2>In Progress</h2>}
        titleSize="m"
      />
    </div>
  )
}

export const EmptyFailed = ({ error }) => {
  return (
    <div className='space-y-8' style={{ padding: '80px 0', textAlign: 'center' }}>
      <OutputLink/>
      <EuiEmptyPrompt
        body={
          error ? <div>
            <div className="mb-2">
              The Task has failed due to following Exception.
            </div>
            <EuiCodeBlock
              style={{ textAlign:"left", backgroundColor: '#F1F4FA' }}
              transparentBackground
              paddingSize="none"
              language="python"
              isCopyable>
              {error}
            </EuiCodeBlock>
          </div> :  <div>
            <p>The task has failed.</p>
          </div>
        }
        color="subdued"
        layout="vertical"
        title={<h2>Failed</h2>}
        titleSize="m"
      />
    </div>
  )
}

export const EmptyFailedInputJs = ({ error , }) => {
  return (
    <div className='space-y-8' style={{ padding: "20px 0", textAlign: 'center' }}>
      <EuiEmptyPrompt
        body={
          error ? <div>
            <div className="mb-2">
            The task has failed due to incorrect syntax in the input_js file.
            </div>
            <EuiCodeBlock
              style={{ textAlign:"left", backgroundColor: '#F1F4FA' }}
              transparentBackground
              paddingSize="none"
              language="python"
              isCopyable>
              {error}
            </EuiCodeBlock>
          </div> :  <div>
          <p>The task has failed due to incorrect syntax in the input_js file.</p>
          </div>
        }
        color="subdued"
        layout="vertical"
        title={<h2>Incorrect input_js file</h2>}
        titleSize="m"
      />
    </div>
  )
}

export const EmptyAborted = () => {
  return (
    <div className='space-y-8' style={{ padding: '80px 0', textAlign: 'center' }}>
      <OutputLink/>
      <EuiEmptyPrompt
        body={
          <div>
            <p>The task has been aborted.</p>
          </div>
        }
        color="subdued"
        layout="vertical"
        title={<h2>Aborted</h2>}
        titleSize="m"
      />
    </div>
  )
}