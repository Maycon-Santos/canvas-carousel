import { CanvasCarousel } from './canvas-carousel'

const canvas = document.querySelector('canvas')

if (canvas) {
  const canvasCarousel = new CanvasCarousel({
    canvas,
    images: Array(5).fill('https://static.escolakids.uol.com.br/2019/07/paisagem-natural.jpg'),
    resizeMode: 'center',
  })
}

export default CanvasCarousel
