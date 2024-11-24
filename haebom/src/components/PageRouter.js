import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import BoardPage from "../pages/BoardPage";
import NotFoundPage from "../pages/NotFoundPage";
import RankingPage from "../pages/RankingPage";
import TimerPage from "../pages/TimerPage";

const teams = [
  { name: "그룹웨어기술팀", color: "#0081c8" },
  { name: "RPA추진팀", color: "#000000" },
  { name: "계정인증개발팀", color: "#ed334e" },
  { name: "EX서비스개발팀", color: "#fbb132" },
  { name: "EX플랫폼솔루션팀", color: "#1c8b3c" },
];

const PageRoute = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("fadeOut");
    }
  }, [location, displayLocation]);

  return (
    <PageContainer
      className={`${transitionStage}`}
      onAnimationEnd={() => {
        setTransitionStage("fadeIn");
        setDisplayLocation(location);
      }}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<BoardPage teams={teams} />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/timer/:team" element={<TimerPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </PageContainer>
  );
};

export const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
export const fadeOutAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
export const PageContainer = styled.div`
  opacity: 0;
  &.fadeIn {
    animation: ${fadeInAnimation} 1000ms;
    animation-fill-mode: forwards;
  }
  &.fadeOut {
    animation: ${fadeOutAnimation} 1000ms;
    animation-fill-mode: forwards;
  }
`;
export default PageRoute;
