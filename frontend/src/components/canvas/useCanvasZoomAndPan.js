/** @format */

// управление масштабом и панорамированием Stage
export default function useCanvasZoomAndPan(stageRef) {
    const onWheel = (e) => {
        e.evt.preventDefault()
        const stage = stageRef.current
        const scaleBy = 1.05
        const oldScale = stage.scaleX()
        const pointer = stage.getPointerPosition()
        const direction = e.evt.deltaY > 0 ? -1 : 1
        const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy

        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        }

        stage.scale({ x: newScale, y: newScale })

        const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        }

        stage.position(newPos)
        stage.batchDraw()
    }

    return { onWheel }
}
