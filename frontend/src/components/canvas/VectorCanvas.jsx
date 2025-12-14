/** @format */
import { useEditorStore } from "../vector/store/editorStore"
import { useRef, useState } from "react"

export const Canvas = () => {
    const svgRef = useRef(null)

    const { canvas, objects, selectedObjectId } = useEditorStore((s) => s.document)
    const activeTool = useEditorStore((s) => s.activeTool)
    const addObject = useEditorStore((s) => s.addObject)
    const updateObject = useEditorStore((s) => s.updateObject)
    const selectObject = useEditorStore((s) => s.selectObject)

    const [drawingRect, setDrawingRect] = useState(null)
    const [drawingEllipse, setDrawingEllipse] = useState(null)
    const [dragging, setDragging] = useState(null) // {id, startX, startY, origData, type}

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
            origData: { ...obj.data },
            type: obj.type,
        })
        selectObject(obj.id)
    }

    const onMouseDown = (e) => {
        const { x, y } = getMousePosition(e)

        if (activeTool === "rect") {
            setDrawingRect({ x, y, width: 0, height: 0 })
            return
        }

        if (activeTool === "ellipse") {
            setDrawingEllipse({
                startX: x,
                startY: y,
                cx: x,
                cy: y,
                rx: 0,
                ry: 0,
            })
            return
        }

        selectObject(null)
    }

    const onMouseMove = (e) => {
        const { x, y } = getMousePosition(e)

        // Рисуем прямоугольник
        if (activeTool === "rect" && drawingRect) {
            setDrawingRect((prev) => ({
                ...prev,
                width: x - prev.x,
                height: y - prev.y,
            }))
            return
        }

        // Рисуем эллипс
        if (activeTool === "ellipse" && drawingEllipse) {
            const rx = Math.abs(x - drawingEllipse.startX) / 2
            const ry = Math.abs(y - drawingEllipse.startY) / 2
            const cx = (x + drawingEllipse.startX) / 2
            const cy = (y + drawingEllipse.startY) / 2
            setDrawingEllipse({
                ...drawingEllipse,
                cx,
                cy,
                rx,
                ry,
            })
            return
        }

        // Перетаскивание
        if (dragging) {
            const dx = x - dragging.startX
            const dy = y - dragging.startY

            updateObject(dragging.id, (obj) => {
                if (dragging.type === "rect") {
                    return {
                        ...obj,
                        data: {
                            ...obj.data,
                            x: dragging.origData.x + dx,
                            y: dragging.origData.y + dy,
                        },
                    }
                } else if (dragging.type === "ellipse") {
                    return {
                        ...obj,
                        data: {
                            ...obj.data,
                            cx: dragging.origData.cx + dx,
                            cy: dragging.origData.cy + dy,
                        },
                    }
                }
                return obj
            })
        }
    }

    const onMouseUp = () => {
        // Заканчиваем drag
        if (dragging) {
            setDragging(null)
            return
        }

        // Добавляем эллипс
        if (drawingEllipse) {
            const { cx, cy, rx, ry } = drawingEllipse
            if (rx >= 2 && ry >= 2) {
                addObject({
                    id: crypto.randomUUID(),
                    type: "ellipse",
                    layerId: "layer-1",
                    transform: "",
                    style: {
                        fill: "#52c41a55",
                        stroke: "#52c41a",
                        strokeWidth: 2,
                    },
                    data: { cx, cy, rx, ry },
                })
            }
            setDrawingEllipse(null)
            return
        }

        // Добавляем прямоугольник
        if (drawingRect) {
            let { x, y, width, height } = drawingRect
            if (width < 0) {
                x += width
                width = Math.abs(width)
            }
            if (height < 0) {
                y += height
                height = Math.abs(height)
            }
            if (width >= 2 && height >= 2) {
                addObject({
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
                })
            }
            setDrawingRect(null)
        }
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
                onMouseLeave={onMouseUp}>
                {/* Рендер объектов */}
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
                    if (obj.type === "ellipse") {
                        return (
                            <ellipse
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
                {drawingRect && (
                    <rect
                        key="temp-rect"
                        x={drawingRect.width < 0 ? drawingRect.x + drawingRect.width : drawingRect.x}
                        y={drawingRect.height < 0 ? drawingRect.y + drawingRect.height : drawingRect.y}
                        width={Math.abs(drawingRect.width)}
                        height={Math.abs(drawingRect.height)}
                        fill="rgba(24,144,255,0.2)"
                        stroke="#1890ff"
                        strokeDasharray="4"
                        pointerEvents="none"
                    />
                )}

                {/* Временный эллипс */}
                {drawingEllipse && (
                    <ellipse
                        key="temp-ellipse"
                        cx={drawingEllipse.cx}
                        cy={drawingEllipse.cy}
                        rx={drawingEllipse.rx}
                        ry={drawingEllipse.ry}
                        fill="rgba(82,196,26,0.2)"
                        stroke="#52c41a"
                        strokeDasharray="4"
                        pointerEvents="none"
                    />
                )}

                {/* Выделение */}
                {selectedObjectId &&
                    (() => {
                        const obj = objects.find((o) => o.id === selectedObjectId)
                        if (!obj) return null
                        if (obj.type === "rect") {
                            const { x, y, width, height } = obj.data
                            return (
                                <rect
                                    x={x}
                                    y={y}
                                    width={width}
                                    height={height}
                                    fill="none"
                                    stroke="blue"
                                    strokeDasharray="4"
                                    pointerEvents="none"
                                />
                            )
                        }
                        if (obj.type === "ellipse") {
                            const { cx, cy, rx, ry } = obj.data
                            return (
                                <ellipse
                                    cx={cx}
                                    cy={cy}
                                    rx={rx}
                                    ry={ry}
                                    fill="none"
                                    stroke="blue"
                                    strokeDasharray="4"
                                    pointerEvents="none"
                                />
                            )
                        }
                        return null
                    })()}
            </svg>
        </div>
    )
}
