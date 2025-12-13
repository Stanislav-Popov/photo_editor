/** @format */
import { Layout } from "antd"
import { ToolsPanel } from "../components/vector/ToolsPanel"
import { Canvas } from "../components/canvas/VectorCanvas"
import { PropertiesPanel } from "../components/vector/PropertiesPanel"
import { LayersPanel } from "../components/vector/LayersPanel"
import styles from "../styles/VectorEditorPage.module.css"

const { Sider, Content, Footer } = Layout

export default function VectorEditorPage() {
    return (
        <Layout>
            <Layout>
                <Sider className={styles.sider} width={64} >
                    <ToolsPanel />
                </Sider>

                <Content className={styles.content}>
                    <Canvas />
                </Content>

                <Sider className={styles.sider} width={280}>
                    <PropertiesPanel />
                </Sider>
            </Layout>

            <Footer style={{ padding: 0, height: 200 }}>
                <LayersPanel />
            </Footer>
        </Layout>
    )
}
