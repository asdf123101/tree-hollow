import styled from '../../theme'

const CarouselContainer = styled.div`
  padding: 40px;
  color: #333;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .slick-initialized .slick-slide {
    transition: all 0.5s;
    // customize width on first div
    // this div seems to be added by react-slick with custom styles
    > div {
      width: 90%;
    }
  }

  .slick-center {
    transform: scale(1.08, 1.05);
    div {
      transition: all 0.5s;
    }
  }
`

export { CarouselContainer }
