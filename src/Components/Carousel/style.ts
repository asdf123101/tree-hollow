import styled from '../../theme'

const CarouselContainer = styled.div`
  padding: 40px;
  color: #333;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .slick-initialized .slick-slide {
    height: 200px;
    display: flex;
    align-items: center;
  }
`

export { CarouselContainer }
