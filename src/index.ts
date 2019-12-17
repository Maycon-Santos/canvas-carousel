import { CanvasCarousel } from './canvas-carousel'

const canvas = document.querySelector('canvas')

if (canvas) {
  const canvasCarousel = new CanvasCarousel({
    canvas,
    images: Array(5).fill('https://www.urbanarts.com.br/imagens/produtos/272711/0/Ampliada/color-tv.jpg'),
    resizeMode: 'contain',
  })
}

export default CanvasCarousel
