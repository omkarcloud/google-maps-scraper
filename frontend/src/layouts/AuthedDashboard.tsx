import Header from '../components/starter/header'

export default function AuthedDashboard({ children, ...props }: any) {
  return (
    <>
      <Header {...props} />
      {children}
    </>
  )
}
