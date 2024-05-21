import { GetServerSideProps } from 'next/types'
import Error from 'next/error'
function removeDotFromLineEnding(line) {
    return line.replace(/\.$/, '');
  }
  
const AxiosErrorHoc = (WrappedComponent) => {
    return (props) => {
        if (props.errorCode) {
            if (props.errorMessage) {
                props.errorMessage
                
                return <Error statusCode={props.errorCode} title={removeDotFromLineEnding(props.errorMessage)} />
            }
            return <Error statusCode={props.errorCode} />
        }
        return <WrappedComponent {...props} />
    }
}

const handleErrorResponse = (response: any) => {
    return {
        props: {
            errorCode: response.status,
            errorMessage: response.data?.['message'],
        },
    }
}

export function wrapAxiosErrors(fn: GetServerSideProps) {
    return async (x) => {
        try {
            // Attempt to call the provided function with its arguments
            return await fn(x)
        } catch (e) {
            // If an error occurs, check if it's an Axios response error
            if (e.response) {
                // Handle the error response and return its result
                return handleErrorResponse(e.response)
            }
            // If the error does not have a response (not an Axios error), re-throw it
            throw e
        }
    }
}

export default AxiosErrorHoc