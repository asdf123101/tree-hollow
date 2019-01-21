import React, { Fragment, ReactElement } from 'react'
import Slider, { Settings } from 'react-slick'

import { CarouselContainer, CarouselFragWrapper } from './style'

// can't set baseUrl and path with create-react-app atm
import { HollowType } from '../../../types/server'

import './slick-theme.css'
import './slick.css'

export default ({
  crouselList,
}: {
  crouselList: HollowType[]
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
        {crouselList.map((crouselFrag, index) => (
          <Fragment key={index}>
            <CarouselFragWrapper>
              <p>{crouselFrag.payload}</p>
            </CarouselFragWrapper>
          </Fragment>
        ))}
      </Slider>
    </CarouselContainer>
  )
}
