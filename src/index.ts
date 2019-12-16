import { CanvasCarousel } from './canvas-carousel'

const canvas = document.querySelector('canvas')

if (canvas) {
  const canvasCarousel = new CanvasCarousel({
    canvas,
    images: Array(5).fill('https://picsum.photos/500/800')
  })
}

export default CanvasCarousel
