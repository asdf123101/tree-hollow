import React, {
  ChangeEvent,
  Dispatch,
  Fragment,
  ReactElement,
  SetStateAction,
  useState,
} from 'react'
import { useMutation } from 'react-apollo-hooks'

import TextArea from './TextArea'

import { CrouselDataFrag } from '../types'
import { UPDATE_HOLLOW_LIST } from './queries'

export default ({
  crouselList,
  updateCrousel,
}: {
  crouselList: CrouselDataFrag[]
  updateCrousel: Dispatch<SetStateAction<CrouselDataFrag[]>>
}): ReactElement<{}> => {
  const [shouldOpen, setShouldOpen] = useState(false)
  const [textValue, setValue] = useState('')
  const updateHollowList = useMutation(UPDATE_HOLLOW_LIST)

  const handleClick = () => {
    setShouldOpen(!shouldOpen)
    if (shouldOpen) {
      const newCrouselFrag: CrouselDataFrag = {
        data: textValue,
      }
      updateHollowList({ variables: { hollow: textValue } }).then(
        (res: any) => {
          updateCrousel(res.data.updateHollowList)
        }
      )
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
