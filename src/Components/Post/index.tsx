import React, {
  ChangeEvent,
  Dispatch,
  Fragment,
  ReactElement,
  SetStateAction,
  useState,
} from 'react'

import TextArea from './TextArea'

import { CrouselDataFrag } from '../types'

export default ({
  crouselList,
  updateCrousel,
}: {
  crouselList: CrouselDataFrag[]
  updateCrousel: Dispatch<SetStateAction<CrouselDataFrag[]>>
}): ReactElement<{}> => {
  const [shouldOpen, setShouldOpen] = useState(false)
  const [textValue, setValue] = useState('')

  const handleClick = () => {
    setShouldOpen(!shouldOpen)
    if (shouldOpen) {
      const newCrouselFrag: CrouselDataFrag = {
        data: textValue,
      }
      updateCrousel(crouselList.concat(newCrouselFrag))
    }
  }
  return (
    <Fragment>
      {shouldOpen && (
        <TextArea
          value={textValue}
          handleChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            setValue(event.currentTarget.value)
          }
        />
      )}
      <button onClick={handleClick}>{shouldOpen ? 'Submit' : 'Post'}</button>
    </Fragment>
  )
}
