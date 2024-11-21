import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import BoardPage from "../pages/BoardPage";
import TimerPage from "../pages/TimerPage";
import RankingPage from "../pages/RankingPage";
import NotFoundPage from "../pages/NotFoundPage";
const PageRoute = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransitionStage("fadeOut");
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
        <Route path="/" element={<BoardPage />} />
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
    // animation-fill-mode :애니메이션의 끝난 후의 상태를 설정
    // forward : 애니메이션이 끝난 후 마지막 CSS 그대로 있음
  }
`;
export default PageRoute;
