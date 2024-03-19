export function H1Text({ content, className = '' }) {
  return (
    <h1
      className={
        `font-bold text-4xl md:text-6xl text-center ${className ? className : ''}`
      }>
      {content}
    </h1>
  )
}
