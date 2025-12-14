/** @format */

import React from "react"
import { Rect } from "react-konva"

const HANDLE_SIZE = 10
const OVERLAY_COLOR = "rgba(0, 120, 255, 0.25)"

export default function CropOverlayLayer({ crop, setCrop, stageSize = { width: 0, height: 0 } }) {
    if (!crop.visible) return null

    const { x, y, width, height } = crop
    const { width: stageW, height: stageH } = stageSize

    return (
        <>
            {/* ====== СИНИЙ ФОН (ЗАТЕМНЕНИЕ) ====== */}

            {/* сверху */}
            <Rect x={0} y={0} width={stageW} height={y} fill={OVERLAY_COLOR} />

            {/* снизу */}
            <Rect x={0} y={y + height} width={stageW} height={stageH - (y + height)} fill={OVERLAY_COLOR} />

            {/* слева */}
            <Rect x={0} y={y} width={x} height={height} fill={OVERLAY_COLOR} />

            {/* справа */}
            <Rect x={x + width} y={y} width={stageW - (x + width)} height={height} fill={OVERLAY_COLOR} />

            {/* ====== РАМКА ОБРЕЗКИ ====== */}
            <Rect
                x={x}
                y={y}
                width={width}
                height={height}
                stroke="#00aaff"
                strokeWidth={2}
                draggable
                onDragMove={(e) => {
                    const pos = e.target.position()
                    setCrop((prev) => ({
                        ...prev,
                        x: pos.x,
                        y: pos.y,
                    }))
                }}
            />

            {/* ====== УГЛЫ ====== */}

            {/* ЛЕВЫЙ ВЕРХ */}
            <Corner
                x={x}
                y={y}
                onDrag={(nx, ny) =>
                    setCrop((p) => ({
                        ...p,
                        x: nx,
                        y: ny,
                        width: p.width + (p.x - nx),
                        height: p.height + (p.y - ny),
                    }))
                }
            />

            {/* ПРАВЫЙ ВЕРХ */}
            <Corner
                x={x + width}
                y={y}
                onDrag={(nx, ny) =>
                    setCrop((p) => ({
                        ...p,
                        y: ny,
                        width: nx - p.x,
                        height: p.height + (p.y - ny),
                    }))
                }
            />

            {/* ЛЕВЫЙ НИЗ */}
            <Corner
                x={x}
                y={y + height}
                onDrag={(nx, ny) =>
                    setCrop((p) => ({
                        ...p,
                        x: nx,
                        width: p.width + (p.x - nx),
                        height: ny - p.y,
                    }))
                }
            />

            {/* ПРАВЫЙ НИЗ */}
            <Corner
                x={x + width}
                y={y + height}
                onDrag={(nx, ny) =>
                    setCrop((p) => ({
                        ...p,
                        width: nx - p.x,
                        height: ny - p.y,
                    }))
                }
            />
        </>
    )
}

/* ====== КОМПОНЕНТ УГЛА ====== */
function Corner({ x, y, onDrag }) {
    return (
        <Rect
            x={x - HANDLE_SIZE / 2}
            y={y - HANDLE_SIZE / 2}
            width={HANDLE_SIZE}
            height={HANDLE_SIZE}
            fill="#00aaff"
            draggable
            onDragMove={(e) => {
                const pos = e.target.position()
                onDrag(pos.x + HANDLE_SIZE / 2, pos.y + HANDLE_SIZE / 2)
            }}
        />
    )
}
