/** @format */
export default function RasterPage() {
    return (
        <Layout>
            <ToolbarRaster />

            <CanvasStage>
                <RasterImageLayer src="/your-photo.jpg" />
            </CanvasStage>
        </Layout>
    )
}
