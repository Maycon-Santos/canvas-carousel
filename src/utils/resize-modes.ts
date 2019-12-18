export function cover (image: HTMLImageElement, canvas: HTMLCanvasElement) {
  const imageAspect = image.naturalHeight / image.naturalWidth
  const canvasAspect = canvas.height / canvas.width

  let sourceWidth = image.naturalWidth
  let sourceHeight = image.naturalHeight
  let sourceX = 0
  let sourceY = 0

  if (imageAspect > canvasAspect) {
    sourceHeight = sourceWidth * (canvas.height / canvas.width)
    sourceY = image.naturalHeight / 2 - sourceHeight / 2
  } else {
    sourceWidth = sourceHeight * (canvas.width / canvas.height)
    sourceX = image.naturalWidth / 2 - sourceWidth / 2
  }

  return {
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
  }
}

export function contain (image: HTMLImageElement, canvas: HTMLCanvasElement) {
  const scale = Math.min(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight)

  const destWidth = image.naturalWidth * scale
  const destHeight = image.naturalHeight * scale

  const destXOffset = canvas.width / 2 - (image.naturalWidth / 2) * scale
  const destYOffset = canvas.height / 2 - (image.naturalHeight / 2) * scale

  return {
    destXOffset,
    destYOffset,
    destWidth,
    destHeight,
  }
}

export function center (image: HTMLImageElement, canvas: HTMLCanvasElement) {
  const destXOffset = canvas.width / 2 - image.naturalWidth / 2
  const destYOffset = canvas.height / 2 - image.naturalHeight / 2
  return {
    destXOffset,
    destYOffset,
  }
}
