/** @format */
import React, { useRef } from "react"
import { Stage, Layer } from "react-konva"
import useCanvasZoomAndPan from "./useCanvasZoomAndPan"

export default function CanvasStage({ children }) {
    const stageRef = useRef()
    const { onWheel } = useCanvasZoomAndPan(stageRef)

    return (
        <Stage
            ref={stageRef}
            width={window.innerWidth}
            height={window.innerHeight}
            draggable
            onWheel={onWheel}
            style={{ background: "#eee" }}
        >
            <Layer>{children}</Layer>
        </Stage>
    )
}
