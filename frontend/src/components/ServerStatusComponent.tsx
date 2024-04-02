import { useState, useEffect } from 'react'
import { EuiEmptyPrompt } from '@elastic/eui'
import Api from '../utils/api'

const ServerStatusComponent = () => {
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        const checkApiStatus = async () => {
            try {
                const response = await Api.isApiRunning() // Assuming Api.isApiRunning() returns a promise
                if (response.status !== 200) {
                    setShowAlert(true)
                } else {
                    setShowAlert(false)
                }
            } catch (error) {
                setShowAlert(true)
            }
        }


        // Then set an interval to check every minute
        const interval = setInterval(checkApiStatus, 1 * 60 * 1000)

        // Clear interval on component unmount
        return () => clearInterval(interval)
    }, [])

    if (showAlert) {
        return (
            <EuiEmptyPrompt
            className='mb-4'
            color="plain"
            title={<h2>Server is Down</h2>}
            body={
              <p>
                Your Server is down. Kindly check it.
              </p>
            }
          />
        
          )
    }

    return null // Render nothing if no alert
}

export default ServerStatusComponent
