/** @format */

import { useEditorStore } from "../vector/store/editorStore"
import { useRef, useState } from "react"

export const Canvas = () => {
    const svgRef = useRef(null)

    const { canvas, objects, selectedObjectId } = useEditorStore((s) => s.document)

    const activeTool = useEditorStore((s) => s.activeTool)
    const addObject = useEditorStore((s) => s.addObject)
    const selectObject = useEditorStore((s) => s.selectObject)

    const [drawingRect, setDrawingRect] = useState(null)
    const [dragging, setDragging] = useState(null) // {id, startX, startY, origX, origY}

    const getMousePosition = (e) => {
        const rect = svgRef.current.getBoundingClientRect()
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        }
    }

    const onMouseDownObject = (e, obj) => {
        if (activeTool !== "select") return
        e.stopPropagation()

        const { x, y } = getMousePosition(e)
        setDragging({
            id: obj.id,
            startX: x,
            startY: y,
            origX: obj.data.x,
            origY: obj.data.y,
        })
        selectObject(obj.id)
    }

    const onMouseDown = (e) => {
        if (activeTool !== "rect") {
            selectObject(null)
            return
        }

        const { x, y } = getMousePosition(e)

        setDrawingRect({
            x,
            y,
            width: 0,
            height: 0,
        })
    }

    const onMouseMove = (e) => {
        const { x, y } = getMousePosition(e)

        // рисование прямоугольника
        if (activeTool === "rect" && drawingRect) {
            setDrawingRect((prev) => ({
                ...prev,
                width: x - prev.x,
                height: y - prev.y,
            }))
            return
        }

        // перемещение выбранного объекта
        if (dragging) {
            const dx = x - dragging.startX
            const dy = y - dragging.startY

            const obj = objects.find((o) => o.id === dragging.id)
            if (!obj) return

            obj.data.x = dragging.origX + dx
            obj.data.y = dragging.origY + dy

            // триггерим обновление состояния через setState
            addObject({ ...obj }) // можно создать action "updateObject"
        }
    }

    const onMouseUp = () => {
        if (dragging) {
            setDragging(null)
            return
        }

        if (!drawingRect) return

        let { x, y, width, height } = drawingRect

        if (width < 0) {
            x += width
            width = Math.abs(width)
        }
        if (height < 0) {
            y += height
            height = Math.abs(height)
        }

        if (width < 2 || height < 2) {
            setDrawingRect(null)
            return
        }

        const rectObject = {
            id: crypto.randomUUID(),
            type: "rect",
            layerId: "layer-1",
            transform: "",
            style: {
                fill: "#1890ff55",
                stroke: "#1890ff",
                strokeWidth: 2,
            },
            data: { x, y, width, height },
        }

        addObject(rectObject)
        setDrawingRect(null) // обязательно
        setDragging(null)
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}>
            <svg
                ref={svgRef}
                width={canvas.width}
                height={canvas.height}
                viewBox={`0 0 ${canvas.width} ${canvas.height}`}
                style={{ background: "#fff" }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={() => setDrawingRect(null)}>
                {objects.map((obj) => {
                    if (obj.type === "rect") {
                        return (
                            <rect
                                key={obj.id}
                                {...obj.data}
                                fill={obj.style.fill}
                                stroke={obj.style.stroke}
                                strokeWidth={obj.style.strokeWidth}
                                transform={obj.transform}
                                onMouseDown={(e) => onMouseDownObject(e, obj)}
                            />
                        )
                    }
                    return null
                })}

                {/* Временный прямоугольник */}
                {drawingRect &&
                    (() => {
                        let { x, y, width, height } = drawingRect

                        if (width === 0 || height === 0) return null

                        if (width < 0) {
                            x += width
                            width = Math.abs(width)
                        }

                        if (height < 0) {
                            y += height
                            height = Math.abs(height)
                        }

                        return (
                            <rect
                                x={x}
                                y={y}
                                width={width}
                                height={height}
                                fill="rgba(24,144,255,0.2)"
                                stroke="#1890ff"
                                strokeDasharray="4"
                                onMouseDown={(e) => onMouseDownObject(e, obj)}
                            />
                        )
                    })()}

                {/* Выделение */}
                {selectedObjectId &&
                    (() => {
                        const selectedObj = objects.find((obj) => obj.id === selectedObjectId)
                        if (!selectedObj) return null

                        const { x, y, width, height } = selectedObj.data
                        return (
                            <rect
                                x={x}
                                y={y}
                                width={width}
                                height={height}
                                fill="none"
                                stroke="blue"
                                strokeDasharray="4"
                                pointerEvents="none" // чтобы контур не перехватывал клики
                            />
                        )
                    })()}
            </svg>
        </div>
    )
}
