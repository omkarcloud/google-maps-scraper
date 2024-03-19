export default function CenterContent({ children, ...props }) {
  return (
    <div
      {...props}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {children}
    </div>
  )
}
