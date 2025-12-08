/** @format */
import React from "react"
import { Button } from "antd"

export default function OpenImageButton({ onSelect }) {
    // onSelect — колбек, который возвращает base64 выбранного изображения
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = () => onSelect(reader.result)
        reader.readAsDataURL(file)
    }

    return (
        <>
            <Button
                type="primary"
                style={{ margin: "10px 0", backgroundColor: "white", color: "black", width: "90%"}}
                onClick={() => document.getElementById("fileInputButton").click()}
            >
                Открыть изображение
            </Button>
            <input
                type="file"
                id="fileInputButton"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
        </>
    )
}
