/** @format */
import styles from "../styles/page.module.css"
import CanvasStage from "../components/canvas/CanvasStage"
import ToolbarButton from "../components/funcButtons/ToobarButton"
import RasterImageLayer from "../components/raster/rasterImageLayer"
import React, { useState } from "react"
import { Layout, Slider } from "antd"
const { Sider, Content } = Layout
import CropOverlayLayer from "../components/raster/CropOverlayLayer"

export default function DefaultPage() {
    const [imageSrc, setImageSrc] = useState(null)
    const [pathFromBackend, setPathFromBackend] = useState(null)
    const [rotateAngle, setRotateAngle] = useState(90)
    const [crop, setCrop] = useState({
        x: 100,
        y: 100,
        width: 300,
        height: 200,
    })

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
                setPathFromBackend(result.image_id)
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

    async function handleHistogram() {
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

    async function handleFlip() {
        if (!setImageSrc) {
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
                body: JSON.stringify({
                    image_id: pathFromBackend,
                    mode: "horizontal",
                }),
            })

            console.log("pathFromBackend:", pathFromBackend)

            if (!response.status) {
                throw new Error(`Ошибка сервера: ${response.status}`)
            }

            const result = await response.json()

            console.log(result)

            if (result.image_id) {
                setPathFromBackend(result.image_id)
                // setImageSrc(`http://localhost:5000${result.url}`)
                const image = new window.Image()
                image.src = `http://localhost:5000${result.url}`
                image.onload = () => setImageSrc(image.src)

                console.log("in result bp " + result.image_id)
                console.log("in result fp " + `http://localhost:5000${result.url}`)
            }
        } catch (error) {
            console.error("Ошибка при отправке:", error)
            alert("Не удалось загрузить изображение на сервер")
        }
    }

    async function handleRotate() {
        console.log(rotateAngle)

        if (!setImageSrc) {
            alert("Сначала загрузите изображение")
            return
        }
        try {
            // Отправляем на сервер
            const response = await fetch("http://localhost:5000/api/rotate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image_id: pathFromBackend,
                    angle: rotateAngle,
                }),
            })

            if (!response.status) {
                throw new Error(`Ошибка сервера: ${response.status}`)
            }

            const result = await response.json()

            console.log(result)

            if (result.image_id) {
                setPathFromBackend(result.image_id)
                // setImageSrc(`http://localhost:5000${result.url}`)
                const image = new window.Image()
                image.src = `http://localhost:5000${result.url}`
                image.onload = () => setImageSrc(image.src)

                console.log("in result bp " + result.image_id)
                console.log("in result fp " + `http://localhost:5000${result.url}`)
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
                <Sider width="25%" className={styles.siderStyle}>
                    <div className={styles.save_load_container}>
                        <ToolbarButton
                            onClick={handleOpenImage}
                            text="Открыть изображение"
                            type="primary"
                            widthOfBtn="48%"
                            // iconName="image"
                        />

                        <ToolbarButton
                            onClick={handleSave}
                            text="Сохранить изображение"
                            type="primary"
                            widthOfBtn="48%"
                            // iconName="image"
                        />
                    </div>

                    <ToolbarButton
                        onClick={handleFlip}
                        text="Отзеркалить изображение"
                        type="primary"
                        widthOfBtn="100%"
                        // iconName="image"
                    />

                    <ToolbarButton
                        onClick={handleHistogram}
                        text="Гистограмма"
                        type="primary"
                        widthOfBtn="100%"
                        // iconName="image"
                    />

                    <div className={styles.sliderBlock}>
                        <h4>Повернуть изображение</h4>
                        <Slider
                            min={0}
                            max={360}
                            value={rotateAngle}
                            onChange={(value) => setRotateAngle(value)}
                        />
                        <span>{rotateAngle}°</span>
                        <ToolbarButton
                            onClick={handleRotate}
                            text="Ок"
                            type="primary"
                            width="180px"
                            // iconName="image"
                        />
                    </div>

                    <ToolbarButton
                        onClick={() => setCrop((c) => ({ ...c, visible: !c.visible }))}
                        text="Обрезка"
                    />
                </Sider>
                <Content className={styles.contentStyle}>
                    <CanvasStage>
                        {imageSrc && <RasterImageLayer src={imageSrc} />}
                        {imageSrc && <CropOverlayLayer crop={crop} setCrop={setCrop} />}
                    </CanvasStage>
                </Content>
            </Layout>
        </Layout>
    )
}
