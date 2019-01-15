import React, { Component, Fragment, useState } from 'react'
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
  const [crouselList, updateCrouselList] = useState(data.hollows)
  return (
    <Fragment>
      <Carousel crouselList={crouselList} />
      <Post crouselList={crouselList} updateCrousel={updateCrouselList} />
    </Fragment>
  )
}

export default Hollow
