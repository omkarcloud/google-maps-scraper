import { useState, useEffect } from 'react'
import { EuiEmptyPrompt } from '@elastic/eui'
import Api from '../utils/api'


const minute = 60 * 1000
const tensecond = 10 *  1000

const ServerStatusComponent = () => {
    const [isDown, setIsDown] = useState(false)

    useEffect(() => {
        const checkApiStatus = async () => {
            try {
                const response = await Api.isApiRunning() // Assuming Api.isApiRunning() returns a promise
                if (response.status !== 200) {
                    setIsDown(true)
                } else {
                    setIsDown(false)
                }
            } catch (error) {
                setIsDown(true)
            }
        }

        const INTERVAL = isDown ? tensecond : minute
        // Then set an interval to check every minute
        // const interval = setInterval(checkApiStatus,  1000 )

        const interval = setInterval(checkApiStatus,  INTERVAL )

        // Clear interval on component unmount
        return () => clearInterval(interval)
    }, [])

    if (isDown) {
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
