import React from 'react'

export default ({
  handleChange,
}: {
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}) => {
  return (
    <textarea
      style={{
        position: 'absolute',
        height: '50%',
        width: '100%',
        left: '0',
        right: '0',
        top: '30%',
        opacity: 0.8,
      }}
      placeholder="Enter your rant"
      onChange={handleChange}
    />
  )
}
