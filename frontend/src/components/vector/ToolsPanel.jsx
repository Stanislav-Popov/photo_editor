/** @format */

import { Button, Tooltip } from "antd"
import { SelectOutlined, BorderOutlined, FontSizeOutlined } from "@ant-design/icons"
import styles from "../../styles/toolsPanel.module.css"
import { useEditorStore } from "./store/editorStore"

export const ToolsPanel = () => {
    const activeTool = useEditorStore((s) => s.activeTool)
    const setActiveTool = useEditorStore((s) => s.setActiveTool)

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

            <Tooltip title="Текст (T)">
                <Button className={styles.btn} icon={<FontSizeOutlined />} />
            </Tooltip>
        </div>
    )
}
