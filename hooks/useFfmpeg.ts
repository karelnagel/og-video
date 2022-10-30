import { createFFmpeg, FFmpeg } from "@ffmpeg/ffmpeg";
import { useEffect, useState } from "react";

const isProduction = process.env.NODE_ENV === "production";

const getFfmpeg = () => {
    let options: any = { log: !isProduction };
    if (!isProduction)
        options.corePath = `${process.env.NEXT_PUBLIC_URL}/libs/ffmpeg/ffmpeg-core.js`
    return createFFmpeg(options);
};

export const useFfmpeg = () => {
    const [ffmpeg, setFfmpeg] = useState<FFmpeg>()
    useEffect(() => {
        const effect = async () => {
            const ffmpeg = getFfmpeg();
            await ffmpeg.load()
            setFfmpeg(ffmpeg)
        }
        effect()
    }, []);
    return ffmpeg;
}