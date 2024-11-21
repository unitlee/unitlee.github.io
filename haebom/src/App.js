import React from "react";
import { BrowserRouter } from "react-router-dom";
import PageRouter from "./components/PageRouter";

export default function App() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <iframe
        src="https://giphy.com/embed/l2SpVPT2FnKozPDby"
        style={{
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
        title="Background Animation"
      ></iframe>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <BrowserRouter>
          <PageRouter />
        </BrowserRouter>
      </div>
    </div>
  );
}
