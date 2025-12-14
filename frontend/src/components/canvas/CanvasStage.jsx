/** @format */

import React, { useRef, useState } from "react"
import { Stage, Layer } from "react-konva"
import useCanvasZoomAndPan from "./useCanvasZoomAndPan"
import CropOverlayLayer from "../raster/CropOverlayLayer"

export default function CanvasStage({ children }) {
    const stageRef = useRef()
    const { onWheel } = useCanvasZoomAndPan(stageRef)

    const canvasWidth = window.innerWidth
    const canvasHeight = window.innerHeight

    const [crop, setCrop] = useState({
        x: 100,
        y: 100,
        width: 300,
        height: 200,
        visible: false,
    })

    return (
        <Stage
            ref={stageRef}
            width={canvasWidth}
            height={canvasHeight}
            draggable
            onWheel={onWheel}
            onDblClick={() => setCrop((c) => ({ ...c, visible: true }))}
            style={{ background: "#eee" }}>
            <Layer>
                {children}

                <CropOverlayLayer
                    crop={crop}
                    setCrop={setCrop}
                    stageSize={{ width: canvasWidth, height: canvasHeight }}
                />
            </Layer>
        </Stage>
    )
}
