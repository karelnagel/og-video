import styles from "../styles/Home.module.css";
import { useState } from "react";
import { useFfmpeg } from "../hooks/useFfmpeg";
import { image2video } from "../lib/image2video";

export default function Home() {
  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("Video title");
  const [color, setColor] = useState("#FFFFFF");
  const [backgroundColor, setBackgroundColor] = useState("#8FA2FF");
  const [progress, setProgress] = useState("");
  const ffmpeg = useFfmpeg();

  const render = async () => {
    setVideo("");
    if (!ffmpeg) return alert("ffmpeg not loaded");
    const video = await image2video(ffmpeg, title, color, backgroundColor, (progress) =>
      setProgress(progress)
    );
    if (!video) return alert("Failed to render video");
    setVideo(video);
  };

  return (
    <div
      className={styles.container}
      style={{
        minHeight: "100vh",
        fontSize: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p>Rendering video using vercel og</p>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      <input
        type="color"
        value={backgroundColor}
        onChange={(e) => setBackgroundColor(e.target.value)}
      />
      <button onClick={render} disabled={!ffmpeg}>
        Render
      </button>
      <p>{progress}</p>
      {video && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <video controls src={video} />
          <a href={video} download="video.mp4">
            DOWNLOAD
          </a>
        </div>
      )}
    </div>
  );
}
