/** @format */

import { Button, Tooltip } from "antd"
import { SelectOutlined, BorderOutlined, FontSizeOutlined } from "@ant-design/icons"
import styles from "../../styles/toolsPanel.module.css"
import { useEditorStore } from "./store/editorStore"

export const ToolsPanel = () => {
    const activeTool = useEditorStore((s) => s.activeTool)
    const setActiveTool = useEditorStore((s) => s.setActiveTool)

    const CircleIcon = ({ filled = false, color = "#1890ff", size = 16 }) => (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={filled ? color : "currentColor"}
            strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" fill={filled ? color : "none"} />
        </svg>
    )

    return (
        <div className={styles.container}>
            <Tooltip title="Выбор (V)">
                <Button
                    className={styles.btn}
                    icon={<SelectOutlined />}
                    onClick={() => setActiveTool("select")}
                />
            </Tooltip>

            <Tooltip title="Прямоугольник (R)">
                <Button
                    className={styles.btn}
                    icon={<BorderOutlined />}
                    onClick={() => setActiveTool("rect")}
                />
            </Tooltip>

            <Tooltip title="Эллипс (E)">
                <Button
                    className={styles.btn}
                    icon={<CircleIcon filled={false} color="#2e6171" />}
                    onClick={() => setActiveTool("ellipse")}
                />
            </Tooltip>

            <Tooltip title="Текст (T)">
                <Button className={styles.btn} icon={<FontSizeOutlined />} />
            </Tooltip>
        </div>
    )
}
