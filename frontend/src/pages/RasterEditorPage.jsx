/** @format */
import styles from "../styles/page.module.css"
import CanvasStage from "../components/canvas/CanvasStage"
import ToolbarButton from "../components/funcButtons/ToobarButton"
import RasterImageLayer from "../components/raster/rasterImageLayer"
import React, { useState } from "react"
import { Layout } from "antd"
const { Header, Sider, Content } = Layout

export default function DefaultPage() {
    const [imageSrc, setImageSrc] = useState(null)

    const handleOpenImage = () => {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "image/*"
        input.style.display = "none"

        const formData = new FormData()
        formData.append("image", file) // Ключ 'image' будет на сервере
        formData.append("filename", file.name)
        formData.append("filetype", file.type)
        formData.append("filesize", file.size.toString())

        input.onchange = (e) => {
            const file = e.target.files[0]
            if (!file) return

            const reader = new FileReader()
            reader.onload = () => {
                setImageSrc(reader.result)
                document.body.removeChild(input)
            }
            reader.readAsDataURL(file)
        }

        try {
            // Отправляем на сервер
            const response = fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formData,
                // Не указываем Content-Type, FormData установит его автоматически
            })

            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`)
            }
        } catch (error) {
            console.error("Ошибка при отправке:", error)
            alert("Не удалось загрузить изображение на сервер")
        }

        document.body.appendChild(input)
        input.click()
    }

    const handleSave = () => {
        if (!imageSrc) {
            console.warn("Нет изображения для сохранения")
            alert("Сначала откройте изображение")
            return
        }

        // Создаем ссылку для скачивания
        const link = document.createElement("a")
        link.href = imageSrc
        link.download = "изображение.png" // или 'изображение.jpg'

        // Добавляем в DOM, кликаем и удаляем
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        console.log("Изображение сохранено как 'изображение.png'")
    }

    const handleUndo = () => {
        console.log("Отмена последнего действия")
        // логика отмены
    }

    const handleDownload = () => {
        console.log("Скачивание...")
        // логика скачивания
    }

    return (
        <Layout className={styles.layoutStyle}>
            {/* <Header className={styles.headerStyle}>Header</Header> */}
            <Layout>
                <Sider width="15%" className={styles.siderStyle}>
                    <ToolbarButton
                        onClick={handleOpenImage}
                        text="Открыть изображение"
                        type="primary"
                        // iconName="image"
                    />

                    <ToolbarButton
                        onClick={handleSave}
                        text="Сохранить изображение"
                        type="primary"
                        // iconName="image"
                    />

                    <ToolbarButton
                        onClick={handleSave}
                        text="Сохранить изображение"
                        type="primary"
                        // iconName="image"
                    />
                </Sider>
                <Content className={styles.contentStyle}>
                    <CanvasStage>{imageSrc && <RasterImageLayer src={imageSrc} />}</CanvasStage>
                </Content>
            </Layout>
        </Layout>
    )
}
