/** @format */

import { Form, InputNumber, Divider, ColorPicker } from "antd"
import { useEditorStore } from "./store/editorStore"
import styles from "../../styles/propertiesPanel.module.css"

export const PropertiesPanel = () => {
    const selectedId = useEditorStore((s) => s.document.selectedObjectId)

    if (!selectedId) {
        return <div className={styles.container}>Объект не выбран</div>
    }

    return (
        <div className={styles.container}>
            <h3>Свойства</h3>

            <Divider />

            <Form layout="vertical">
                <Form.Item label="Заливка">
                    <ColorPicker />
                </Form.Item>

                <Form.Item label="Обводка">
                    <ColorPicker />
                </Form.Item>

                <Form.Item label="Толщина линии">
                    <InputNumber min={0} />
                </Form.Item>
            </Form>
        </div>
    )
}
