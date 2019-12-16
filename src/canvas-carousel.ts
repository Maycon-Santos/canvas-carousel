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

  function renderImage (image: HTMLImageElement, x = 0, y = 0) {
    console.log(image.naturalWidth, image.naturalHeight)
    if (resizeMode === 'cover') {
      const naturalWidth = image.naturalWidth
      const naturalHeight = image.naturalHeight
      const coordinatesToDraw = [x, y]

      let width, height

      if (naturalWidth < naturalHeight && canvas.width > canvas.height) {
        width = canvas.width
        height = (canvas.width / naturalWidth) * naturalHeight
        // coordinatesToDraw[1] -= (canvas.height / 2) + (height / 2)
      } else {
        width = (canvas.height / naturalHeight) * naturalWidth
        height = canvas.height
        // coordinatesToDraw[0] -= (canvas.width / 2) + (width / 2)
      }

      // console.log(image, x, y, canvas.width, canvas.height, x, y, 3164, 2012.8)

      const sourceX = 0
      const sourceY = 0
      const sourceWidth = 150
      const sourceHeight = 150
      const destWidth = width
      const destHeight = height
      const destX = canvas.width / 2 - destWidth / 2
      const destY = canvas.height / 2 - destHeight / 2

      ctx.drawImage(image,
        sourceX, sourceY,
        sourceWidth, sourceHeight,
        destX, destY,
        destWidth, destHeight
      )

      // ctx.drawImage(
      //   image,
      //   x, y,
      //   width, height,
      //   canvas.width / 2 - width / 2, canvas.height / 2 - height / 2,
      //   width, height
      // )
    }
    // const width =
    // ctx.drawImage(image, 0, 0, canvas.width, canvas.height, 0, 0)
  }
} as any as {
  new (options: OptionsInterface): CanvasCarouselInterface
}
