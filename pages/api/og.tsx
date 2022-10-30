/* eslint-disable import/no-anonymous-default-export */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const frame = Number(searchParams.get("frame")) || 1;
  const durationInFrames = Number(searchParams.get("durationInFrames")) || 1;
  const color = searchParams.get("color") || "#FFFFFF";
  const backgroundColor = searchParams.get("backgroundColor") || "#000000";
  const title = searchParams.get("title") || "";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          backgroundColor,
        }}
        tw="items-center justify-center flex-col bg-red-200 h-full w-full relative"
      >
        <p tw="text-7xl font-bold uppercase" style={{ color }}>
          {title}
        </p>
        <p tw="text-9xl font-bold" style={{ color }}>
          {frame}
        </p>
        <div tw="absolute bottom-0 h-20 w-full left-0" style={{ display: "flex" }}>
          <div
            tw="h-full"
            style={{
              backgroundColor: color,
              width: `${(frame / durationInFrames) * 100}%`,
              display: "flex",
            }}
          ></div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
