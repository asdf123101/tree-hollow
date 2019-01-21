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

import { HollowType } from '../../../types/server'
import { UPDATE_HOLLOW_LIST } from './queries'

export default ({
  hollowList,
  updateCrousel,
}: {
  hollowList: HollowType[]
  updateCrousel: Dispatch<SetStateAction<HollowType[]>>
}): ReactElement<{}> => {
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false)
  const [shouldOpen, setShouldOpen] = useState(false)
  const [textValue, setValue] = useState('')
  const updateHollowList = useMutation(UPDATE_HOLLOW_LIST)

  const handleClick = () => {
    setShouldOpen(!shouldOpen)
    if (shouldOpen) {
      // always display on front-end
      updateCrousel(hollowList.concat({ payload: textValue }))
      // show a hint when a res is sent from server
      // TODO: error handling
      updateHollowList({ variables: { hollow: textValue } }).then(() => {
        setIsUpdateSuccessful(true)
        setTimeout(() => setIsUpdateSuccessful(false), 3000)
      })
    } else {
      setIsUpdateSuccessful(false)
    }
  }
  return (
    <Fragment>
      {isUpdateSuccessful && <h3>You hollow has been sent!</h3>}
      {shouldOpen && (
        <TextArea
          handleChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            setValue(event.currentTarget.value)
          }
        />
      )}
      <button onClick={handleClick}>{shouldOpen ? 'Submit' : 'Post'}</button>
    </Fragment>
  )
}
