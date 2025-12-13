import { Tree } from 'antd'
import { useEditorStore } from './store/editorStore'
import styles from "../../styles/layersPanel.module.css"

export const LayersPanel = () => {
  const layers = useEditorStore((s) => s.document.layers)

  const treeData = layers.map((layer) => ({
    key: layer.id,
    title: layer.name
  }))

  return (
    <div className={styles.container}>
      <h3>Слои</h3>
      <Tree treeData={treeData} />
    </div>
  )
}
