import {
  EuiButton,
  EuiIcon,
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiToolTip,
} from '@elastic/eui'
import { useState } from 'react'
import ClickOutside from '../ClickOutside/ClickOutside'
import Tabs from '../Tabs/Tabs'

import { EuiForm, EuiFormRow } from '@elastic/eui'
import CheckboxField from '../inputs/CheckBoxField'
function getprefs() {
  if (typeof window === 'undefined') {
    return { format: 'csv', convert_to_english: true }
  }

  let downloadPreference
  try {
    downloadPreference = JSON.parse(
      localStorage.getItem('download_preference') ||
        '{"format": "csv", "convert_to_english": true}'
    )
  } catch (error) {
    console.error('Error parsing download preferences:', error)
    downloadPreference = { format: 'csv', convert_to_english: true } // Default value in case of error
  }
  return downloadPreference
}

let prefs = getprefs()

const tabs = [
  {
    id: 'csv',
    name: 'CSV',
    content: <></>, // Assuming no content is needed for the sorting tabs
  },
  {
    id: 'json',
    name: 'JSON',
    content: <></>, // Assuming no content is needed for the sorting tabs
  },
  {
    id: 'excel',
    name: 'Excel',
    content: <></>, // Assuming no content is needed for the sorting tabs
  },
]

const DownloadForm = ({ onSubmit }) => {
  const [state, setState] = useState(getprefs)

  const onTabClick = selectedTab => {
    setState({
      ...state,
      format: selectedTab.id,
    })
  }

  const handleCheckboxChange = e => {
    setState({
      ...state,
      convert_to_english: e,
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    prefs = state
    localStorage.setItem('download_preference', JSON.stringify(state))
    if (onSubmit) {
      onSubmit(state)
    }
  }

  return (
    <EuiForm component="form" onSubmit={handleSubmit}>
      <EuiFormRow
        className="remove-tabs-bottom-border"
        label="Format"
        fullWidth>
        <Tabs tabs={tabs} selectedTab={state.format} onTabChange={onTabClick} />
      </EuiFormRow>

      <EuiFormRow
        label={
          <EuiToolTip content="Convert non-English characters (like á, é, ñ) to their English equivalents (a, e, n).">
            <span>
              Convert non-English characters to English characters{' '}
              <EuiIcon type="questionInCircle" color="subdued" />
            </span>
          </EuiToolTip>
        }
        fullWidth>
        <CheckboxField
          id="convert_to_english"
          value={state.convert_to_english}
          onChange={handleCheckboxChange}
        />
      </EuiFormRow>

      <EuiButton type="submit" fill>
        Download
      </EuiButton>
    </EuiForm>
  )
}

function useDownloadModal(onDownload) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  // Call this function when the download is successfully initiated
  function successClose(data) {
    toggleModal()
    onDownload(data) // Call the passed function on successful submission/download
  }

  const modal = isModalVisible && (
    <EuiModal className="max-w-xl text-center" onClose={toggleModal}>
      <ClickOutside
        handleClickOutside={() => {
          toggleModal()
        }}>
        <div>
          <EuiModalHeader className="justify-center">
            <EuiModalHeaderTitle>Download Results</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <DownloadForm onSubmit={successClose} />
          </EuiModalBody>
        </div>
      </ClickOutside>
    </EuiModal>
  )

  return { showModal: () => setIsModalVisible(true), modal }
}
const DownloadStickyBar = ({ onDownload, showPagination }) => {
  function directDownload() {
    // gets download preference from local storage, if not then it is {"format": "csv", "convert_to_english": true }
    // if convert_to_english is true then the language will be converted to english
    const downloadPreference = getprefs()
    onDownload(downloadPreference)
  }

  const { modal, showModal } = useDownloadModal(onDownload)
  const fmt = `Download ${tabs.find(x => x.id === prefs.format).name}`
  return (
    <div className={showPagination ? 'pt-2' : 'pt-6'}>
      {modal}
      <EuiButton className="mr-2" onClick={directDownload} iconType="download">
        {fmt}
      </EuiButton>
      <EuiIcon
        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
        type="arrowDown"
        onClick={showModal}
      />
    </div>
  )
}

export default DownloadStickyBar
