import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-apollo-hooks'

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
  const [carouselList, updateCarouselList] = useState(data.hollows)
  return (
    <Fragment>
      <Carousel carouselList={carouselList} />
      <Post hollowList={carouselList} updateCrousel={updateCarouselList} />
    </Fragment>
  )
}

export default Hollow
