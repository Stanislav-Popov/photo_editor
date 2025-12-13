/** @format */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Layout } from "antd"
import { Link } from "react-router-dom" // Добавьте Link для навигации
import MainPage from "./pages/MainPage"
import RasterEditorPage from "./pages/RasterEditorPage"
import VectorEditorPage from "./pages/VectorEditorPage"
import Editor3DPage from "./pages/Editor3DPage"
import styles from "./styles/app.module.css" // Создайте стили для App

const { Header, Content } = Layout

function App() {
    return (
        <Router>
            <Layout>
                <Header className={styles.header}>
                    <div className={styles.headerContent}>
                        <Link to="/" className={styles.logo}>
                            Логотип
                        </Link>
                        <nav className={styles.nav}>
                            <Link to="/" className={styles.navLink}>
                                Главная
                            </Link>
                            <Link to="/rasterEditor" className={styles.navLink}>
                                Растровая
                            </Link>
                            <Link to="/vectorEditor" className={styles.navLink}>
                                Векторная
                            </Link>
                            <Link to="/3DEditor" className={styles.navLink}>
                                3D
                            </Link>
                            {/* Добавьте другие ссылки по необходимости */}
                        </nav>
                    </div>
                </Header>

                <Content>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/rasterEditor" element={<RasterEditorPage />} />
                        <Route path="/vectorEditor" element={<VectorEditorPage />} />
                        <Route path="/3DEditor" element={<Editor3DPage />} />
                    </Routes>
                </Content>
            </Layout>
        </Router>
    )
}

export default App
