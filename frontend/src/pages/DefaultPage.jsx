/** @format */
import styles from "../styles/page.module.css"
import CanvasStage from "../components/canvas/CanvasStage"
import OpenImageButton from "../components/funcButtons/OpenImageButton"
import RasterImageLayer from "../components/raster/rasterImageLayer"
import React, { useState } from "react"
import { Layout } from "antd"
const { Header, Sider, Content } = Layout

export default function DefaultPage() {
    const [imageSrc, setImageSrc] = useState(null)

    return (
        <Layout className={styles.layoutStyle}>
            <Header className={styles.headerStyle}>Header</Header>
            <Layout>
                <Sider width="15%" className={styles.siderStyle}>
                    <OpenImageButton onSelect={setImageSrc} />
                </Sider>
                <Content className={styles.contentStyle}>
                    <CanvasStage>{imageSrc && <RasterImageLayer src={imageSrc} />}</CanvasStage>
                </Content>
            </Layout>
        </Layout>
    )
}
