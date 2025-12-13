/** @format */
import React from "react"
import { Button } from "antd"
// import {
//     SaveOutlined,
//     UndoOutlined,
//     DownloadOutlined,
//     UploadOutlined,
//     DeleteOutlined
// } from '@ant-design/icons'

// // Объект с доступными иконками
// const iconComponents = {
//     save: <SaveOutlined />,
//     undo: <UndoOutlined />,
//     download: <DownloadOutlined />,
//     upload: <UploadOutlined />,
//     delete: <DeleteOutlined />
// }

export default function ToolbarButton({
    onClick,
    text = "Кнопка",
    type = "default",
    style,
    className,
    disabled = false,
    // iconName // название иконки из объекта выше
}) {
    return (
        <Button
            type={type}
            // icon={iconName ? iconComponents[iconName] : null}
            style={{
                margin: "10px 0",
                width: "90%",
                backgroundColor: "white",
                color: "black",
                ...style,
            }}
            className={className}
            onClick={onClick}
            disabled={disabled}>
            {text}
        </Button>
    )
}
