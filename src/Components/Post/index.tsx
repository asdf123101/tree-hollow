import React, { Fragment, useState } from 'react'

import TextArea from './TextArea'

export default () => {
  const [shouldOpen, setShouldOpen] = useState(false)

  return (
    <Fragment>
      {shouldOpen && <TextArea />}
      <button onClick={() => setShouldOpen(!shouldOpen)}>
        {shouldOpen ? 'Submit' : 'Post'}
      </button>
    </Fragment>
  )
}
