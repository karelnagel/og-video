import { fetchFile, FFmpeg } from "@ffmpeg/ffmpeg";

export const image2video = async (ffmpeg: FFmpeg, title: string, color: string, backgroundColor: string, onProgress = (progress: string) => { }) => {
    try {
        const durationInFrames = 60

        // Loading all images
        onProgress(`Loading images...`);

        for (let i = 1; i <= durationInFrames; i += 1) {
            const num = `00${i}`.slice(-3);
            const uri = `${process.env.NEXT_PUBLIC_URL}/api/og?frame=${num}&durationInFrames=${durationInFrames}&color=${encodeURIComponent(color)}&backgroundColor=${encodeURIComponent(backgroundColor)}&title=${encodeURIComponent(title)}`
            ffmpeg.FS(
                "writeFile",
                `tmp.${num}.png`,
                await fetchFile(uri)
            );
            onProgress(`Loading image ${i}/${durationInFrames}`);
        }
        onProgress("Encoding video...");
        await ffmpeg.run(
            "-framerate",
            "30",
            "-pattern_type",
            "glob",
            "-i",
            "*.png",
            "-c:a",
            "copy",
            "-shortest",
            "-c:v",
            "libx264",
            "-pix_fmt",
            "yuv420p",
            "out.mp4"
        );
        onProgress("Encoding finished!");
        const data = ffmpeg.FS("readFile", "out.mp4");
        onProgress("Cleaning up!")

        for (let i = 1; i <= durationInFrames; i += 1) {
            const num = `00${i}`.slice(-3);
            ffmpeg.FS("unlink", `tmp.${num}.png`);
        }
        onProgress("")
        return URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
    }
    catch (e) {
        console.log(e)
        return
    }
};