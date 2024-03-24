import { useState, useEffect } from 'react'
import TextAreaField from './TextAreaField'
import TextField from './TextField'

export function OutputTextAreaField({ value: output, ...props }) {
  const [state, setstate] = useState({
    textOutput: '',
  })

  function onChange(change) {
    setstate(prev => ({ ...prev, ...change }))
  }

  useEffect(() => {
    onChange({ textOutput: output })
  }, [output])
  return (
    <TextAreaField
      rows={6}
      {...props}
      value={state.textOutput}
      onChange={textOutput => {
        onChange({ textOutput })
      }}
    />
  )
}

export function OutputTextField({ value: output, ...props }) {
  const [state, setstate] = useState({
    textOutput: '',
  })

  function onChange(change) {
    setstate(prev => ({ ...prev, ...change }))
  }

  useEffect(() => {
    onChange({ textOutput: output })
  }, [output])
  return (
    <TextField
      value={state.textOutput}
      {...props}
      onChange={textOutput => {
        onChange({ textOutput })
      }}
    />
  )
}
