import React, { Fragment, ReactElement } from 'react'
import Slider, { Settings } from 'react-slick'

import { Tag } from '../Tag/style'
import { CarouselContainer, CarouselFragWrapper } from './style'

// can't set baseUrl and path with create-react-app atm
import { GetHollows_hollows } from '../../../types/client/gql/GetHollows'

import './slick-theme.css'
import './slick.css'

export default ({
  crouselList,
}: {
  crouselList: GetHollows_hollows[]
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
              <p>
                {crouselFrag.payload}
                <br />
                {crouselFrag.tags.map(
                  tag => tag && <Tag key={tag.name}>{tag.name}</Tag>
                )}
              </p>
            </CarouselFragWrapper>
          </Fragment>
        ))}
      </Slider>
    </CarouselContainer>
  )
}
