import React, { Fragment, ReactElement } from 'react'
import Slider, { Settings } from 'react-slick'

import { Card } from '../Card'
import { TagList } from '../Tag'
import { CarouselContainer } from './style'

// can't set baseUrl and path with create-react-app atm
import { GetHollows_hollows } from '../../../types/client/gql/GetHollows'

import './slick-theme.css'
import './slick.css'

export default ({
  carouselList,
}: {
  carouselList: GetHollows_hollows[]
}): ReactElement<{}> => {
  const settings: Settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'ease-in-out',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <CarouselContainer className="container">
      <Slider {...settings}>
        {carouselList.map((carouselFrag, index) => (
          // virtual wrapper for react-slick
          <Fragment key={index}>
            <Card>
              <p style={{ margin: 0 }}>{carouselFrag.payload}</p>
              <TagList list={carouselFrag.tags!.map(tag => tag.name)} />
            </Card>
          </Fragment>
        ))}
      </Slider>
    </CarouselContainer>
  )
}
