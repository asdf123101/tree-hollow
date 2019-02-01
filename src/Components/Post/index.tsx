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

import { GetHollows_hollows } from '../../../types/client/gql/GetHollows'
import { ADD_HOLLOW } from './queries'

export default ({
  hollowList,
  updateCrousel,
}: {
  hollowList: GetHollows_hollows[]
  updateCrousel: Dispatch<SetStateAction<GetHollows_hollows[]>>
}): ReactElement<{}> => {
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false)
  const [shouldOpen, setShouldOpen] = useState(false)
  const [textValue, setValue] = useState('')
  const [tagValue, setTag] = useState('')
  const updateHollowList = useMutation(ADD_HOLLOW)

  const handleClick = () => {
    setShouldOpen(!shouldOpen)
    if (shouldOpen) {
      // always display on front-end
      updateCrousel(
        hollowList.concat({
          __typename: 'Hollow',
          payload: textValue,
          tags: [{ __typename: 'Tag', name: tagValue }],
        })
      )
      // show a hint when a res is sent from server
      // TODO: error handling
      updateHollowList({
        variables: {
          hollow: {
            hollow: { payload: textValue },
            tags: [{ name: tagValue }],
          },
        },
      }).then(() => {
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
      <form>
        {shouldOpen ? (
          <>
            <TextArea
              handleChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                setValue(event.currentTarget.value)
              }
            />
            <input
              type="text"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setTag(event.currentTarget.value)
              }
            />
            <input type="submit" onClick={handleClick} value="Submit" />
          </>
        ) : (
          <button onClick={handleClick}>Post</button>
        )}
      </form>
    </Fragment>
  )
}
