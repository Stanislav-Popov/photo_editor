import React, { useEffect, useState } from "react"
import { Image as KonvaImage } from "react-konva"
import useImageAutoFit from "./useImageAutoFit" // <-- подключаем хук

export default function RasterImageLayer({ src }) {
    const [img, setImg] = useState(null)
    const [initProps, setInitProps] = useState({ x: 0, y: 0, scale: 1 })

    useEffect(() => {
        if (!src) {
            setImg(null)
            return
        }

        const image = new window.Image()
        image.src = src
        image.onload = () => {
            setImg(image)

            // используем хук для вычисления координат и масштаба
            const props = useImageAutoFit(image)
            setInitProps(props)
        }
    }, [src])

    if (!img) return null

    return (
        <KonvaImage
            image={img}
            x={initProps.x}
            y={initProps.y}
            scaleX={initProps.scale}
            scaleY={initProps.scale}
        />
    )
}
