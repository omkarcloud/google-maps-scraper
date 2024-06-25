export const Container = ({ children }) => {
  return (
    <div
      className="home-container"
      style={{
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingBottom: '32px',
        margin: '0 auto',
        maxWidth: '800px',
      }}>
      {children}
    </div>
  )
}

export const OutputTabsContainer = ({ children }) => {
  return (
    <div
      className="home-container"
      style={{
        paddingLeft: '16px',
        paddingRight: '16px',
        margin: '0 auto',
        maxWidth: '800px',
      }}>
      {children}
    </div>
  )
}

export const OutputTabsContainerWithBottomPadding = ({ children }) => {
  return (
    <div
      className=""
      style={{
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingBottom: '32px',
        margin: '0 auto',
        maxWidth: '800px',
      }}>
      {children}
    </div>
  )
}

export const OutputContainer = ({ children }) => {
  return (
    <div
      className="home-container"
      style={{
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingBottom: '32px',
        margin: '0 auto',
        maxWidth: '1200px',
      }}>
      {children}
    </div>
  )
}

export const OutputContainerWithoutBottomPadding = ({ children }) => {
  return (
    <div
      className=""
      style={{
        paddingLeft: '16px',
        paddingRight: '16px',
        margin: '0 auto',
        maxWidth: '1200px',
      }}>
      {children}
    </div>
  )
}

export const OutputContainerWithBottomPadding = ({ children , className=""}) => {
  return (
    <div
      className={className}
      style={{
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingBottom: '32px',
        margin: '0 auto',
        maxWidth: '1200px',
      }}>
      {children}
    </div>
  )
}

export const TabWrapper = ({ children }) => {
  return <div className="mt-4">{children}</div>
}

