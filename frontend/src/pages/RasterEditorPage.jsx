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
    const [pathFromBackend, setPathFromBackend] = useState(null)

    const handleOpenImage = () => {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "image/*"
        input.style.display = "none"

        input.onchange = async (e) => {
            const file = e.target.files[0]
            if (!file) return

            const reader = new FileReader()
            reader.onload = () => {
                setImageSrc(reader.result)
                document.body.removeChild(input)
            }
            reader.readAsDataURL(file)

            const formData = new FormData()
            formData.append("file", file) // Ключ 'image' будет на сервере
            formData.append("filename", file.name)
            formData.append("filetype", file.type)
            formData.append("filesize", file.size.toString())

            try {
                // Отправляем на сервер
                const response = await fetch("http://localhost:5000/api/upload", {
                    method: "POST",
                    body: formData,
                })

                if (!response.status) {
                    throw new Error(`Ошибка сервера: ${response.status}`)
                }
                // Добавьте получение ответа от сервера
                const result = await response.json()
                console.log("Ответ сервера:", result.status)
                setPathFromBackend(result.path)
            } catch (error) {
                console.error("Ошибка при отправке:", error)
                alert("Не удалось загрузить изображение на сервер")
            }
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

    async function handleGistogramm() {
        if (!pathFromBackend) {
            alert("Сначала загрузите изображение")
            return
        }
        try {
            // Отправляем на сервер
            const response = await fetch("http://localhost:5000/api/gistogramm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ path: pathFromBackend }),
            })

            if (!response.status) {
                throw new Error(`Ошибка сервера: ${response.status}`)
            }

            const result = await response.json()
            if (result.imageBase64) {
                setImageSrc(`data:image/png;base64,${result.imageBase64}`)
            } else if (result.path) {
                setImageSrc(result.path)
            } else if (result.imageUrl) {
                setImageSrc(result.imageUrl)
            } else if (result.image) {
                setImageSrc(result.image)
            }
        } catch (error) {
            console.error("Ошибка при отправке:", error)
            alert("Не удалось загрузить изображение на сервер")
        }
    }

    async function handleRotate() {
        if (!pathFromBackend) {
            alert("Сначала загрузите изображение")
            return
        }
        try {
            // Отправляем на сервер
            const response = await fetch("http://localhost:5000/api/flip", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ path: pathFromBackend }),
            })

            if (!response.status) {
                throw new Error(`Ошибка сервера: ${response.status}`)
            }

            const result = await response.json()
            if (result.imageBase64) {
                setImageSrc(`data:image/png;base64,${result.imageBase64}`)
            } else if (result.path) {
                setImageSrc(result.path)
            } else if (result.imageUrl) {
                setImageSrc(result.imageUrl)
            } else if (result.image) {
                setImageSrc(result.image)
            }
        } catch (error) {
            console.error("Ошибка при отправке:", error)
            alert("Не удалось загрузить изображение на сервер")
        }
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

                    <ToolbarButton onClick={handleRotate} text="Повернуть изображение" type="primary" />

                    <ToolbarButton
                        onClick={handleGistogramm}
                        text="Гистограмма"
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
