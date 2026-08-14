import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0c",
          color: "#c6a667",
          fontSize: 168,
          letterSpacing: 10,
          fontWeight: 500,
        }}
      >
        CN
      </div>
    ),
    size,
  );
}
