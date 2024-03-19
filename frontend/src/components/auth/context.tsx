import { formatDate } from '@elastic/eui'
import { createContext, useContext } from 'react'

// Create a new context for the authentication state
const AuthContext = createContext(undefined)

// Create a provider component that will wrap the app and provide access to the authentication state
function AuthProvider({ children, ...props }) {
  const joined_at = props.created_at && formatDate(props.created_at)
  const userInfo = props
  return (
    <AuthContext.Provider
      value={{ ...props, user_info: { ...userInfo, joined_at } }}>
      {children}
    </AuthContext.Provider>
  )
}

// Create a custom hook to easily access the authentication state and functions from any component
function useAuth() {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }
