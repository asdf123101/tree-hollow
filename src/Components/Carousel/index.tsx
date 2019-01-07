import React, { ReactElement } from 'react'
import Slider, { Settings } from 'react-slick'

import { CarouselContainer, CarouselFragWrapper } from './style'

import './slick-theme.css'
import './slick.css'

interface CrouselDataFrag {
  data: string
}

export default ({
  crouselList,
}: {
  crouselList: CrouselDataFrag[]
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
        {crouselList.map(crouselFrag => (
          <>
            <CarouselFragWrapper key={crouselFrag.data}>
              <p>{crouselFrag.data}</p>
            </CarouselFragWrapper>
          </>
        ))}
      </Slider>
    </CarouselContainer>
  )
}
