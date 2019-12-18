import { cover, contain, center } from './utils/resize-modes'

interface CanvasCarouselInterface {
  espera?: any
}

interface OptionsInterface {
  canvas: HTMLCanvasElement
  images: string[]
  type?: 'slide' | 'stack' | 'fade'
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center'
  useParallax?: boolean
}

interface StateInterface {
  images: HTMLImageElement[]
}

export const CanvasCarousel = async function (this: CanvasCarouselInterface, options: OptionsInterface): Promise<any> {
  const state: StateInterface = {
    images: [],
  }

  const {
    canvas,
    type = 'slide',
    resizeMode = 'cover',
    useParallax = false,
  }: OptionsInterface = options

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  window.addEventListener('resize', (function setCanvasSize () {
    const canvasComputedStyle = getComputedStyle(canvas)
    const computedWidth = canvasComputedStyle.width
    const computedHeight = canvasComputedStyle.height

    if (computedWidth) {
      canvas.width = parseInt(computedWidth.replace(/\D+/, ''))
    }

    if (computedHeight) {
      canvas.height = parseInt(computedHeight.replace(/\D+/, ''))
    }

    return setCanvasSize
  })())

  await loadImages()

  renderImage(state.images[0])

  console.log(state)

  function loadImages (): Promise<any> {
    const { images: imagesSources } = options
    const imagesSourcesLength = imagesSources.length

    return new Promise(resolve => {
      imagesSources.forEach(imageSource => {
        const image = new Image()
        image.src = imageSource
        image.onload = () => {
          if (state.images.push(image) === imagesSourcesLength) {
            resolve()
          }
        }
      })
    })
  }

  function renderImage (image: HTMLImageElement, destX = 0, destY = 0) {
    if (resizeMode === 'cover') {
      const {
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
      } = cover(image, canvas)

      ctx.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        destX,
        destY,
        canvas.width,
        canvas.height
      )
    }

    if (resizeMode === 'contain') {
      const {
        destXOffset,
        destYOffset,
        destWidth,
        destHeight,
      } = contain(image, canvas)

      ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        destX + destXOffset,
        destY + destYOffset,
        destWidth,
        destHeight
      )
    }

    if (resizeMode === 'stretch') {
      ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        destX,
        destY,
        canvas.width,
        canvas.height
      )
    }

    if (resizeMode === 'repeat') {
      const pattern = ctx.createPattern(image, 'repeat')

      if (pattern) {
        ctx.fillStyle = pattern
        ctx.fillRect(destX, destX, canvas.width, canvas.height)
      }
    }

    if (resizeMode === 'center') {
      const {
        destXOffset,
        destYOffset,
      } = center(image, canvas)

      ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        destX + destXOffset,
        destY + destYOffset,
        image.naturalWidth,
        image.naturalHeight,
      )
    }
  }
} as any as {
  new (options: OptionsInterface): CanvasCarouselInterface
}
