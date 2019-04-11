import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-apollo-hooks'

import { GetHollows_hollows } from '../../../types/client/gql/GetHollows'
import Carousel from '../../Components/Carousel'
import Post from '../../Components/Post'
import { GET_HOLLOWS } from './queries'

const Hollow = () => {
  const { data, errors, loading } = useQuery(GET_HOLLOWS, { suspend: false })
  if (errors) {
    return <h1>Error</h1>
  }
  if (loading) {
    return <h1>Loading</h1>
  }
  return <HollowWrapper hollows={data.hollows} />
}

const HollowWrapper = ({ hollows }: { hollows: GetHollows_hollows[] }) => {
  const [carouselList, updateCarouselList] = useState(hollows)
  return (
    <Fragment>
      <Carousel carouselList={carouselList} />
      <Post hollowList={carouselList} updateCrousel={updateCarouselList} />
    </Fragment>
  )
}

export default Hollow
