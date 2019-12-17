export function cover (image: HTMLImageElement, canvas: HTMLCanvasElement) {
  const naturalWidth = image.naturalWidth
  const naturalHeight = image.naturalHeight

  const imageAspect = naturalHeight / naturalWidth
  const canvasAspect = canvas.height / canvas.width

  let sourceWidth = naturalWidth
  let sourceHeight = naturalHeight
  let sourceX = 0
  let sourceY = 0

  if (imageAspect > canvasAspect) {
    sourceHeight = sourceWidth * (canvas.height / canvas.width)
    sourceY = naturalHeight / 2 - sourceHeight / 2
  } else {
    sourceWidth = sourceHeight * (canvas.width / canvas.height)
    sourceX = naturalWidth / 2 - sourceWidth / 2
  }

  return {
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
  }
}

export function contain (image: HTMLImageElement, canvas: HTMLCanvasElement) {
  // const naturalWidth = image.naturalWidth
  // const naturalHeight = image.naturalHeight

  const sourceWidth = image.naturalWidth
  const sourceHeight = image.naturalHeight

  // const sourceX = naturalWidth / 2 - sourceWidth / 2
  // const sourceY = naturalHeight / 2 - sourceHeight / 2

  return {
    // sourceX,
    // sourceY,
    sourceWidth,
    sourceHeight,
  }
}
