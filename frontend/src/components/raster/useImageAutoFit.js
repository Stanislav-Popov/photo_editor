/** @format */

export default function useImageAutoFit(img) {
    if (!img) return { x: 0, y: 0, scale: 1 }

    const iw = img.width
    const ih = img.height

    const sw = window.innerWidth
    const sh = window.innerHeight

    const scale = Math.min(sw / iw, sh / ih)

    const x = sw / 2 - (iw * scale) / 2
    const y = sh / 2 - (ih * scale) / 2

    return { x, y, scale }
}
