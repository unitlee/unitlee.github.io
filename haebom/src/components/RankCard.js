import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React, { useLayoutEffect, useRef } from "react";

export default function RankCard({ team, index, quiz }) {
  const cardRef = useRef(null);
  const prevPositionRef = useRef(null);

  const formatTimeDelta = (timedelta) => {
    const [mm, ss, ms] = [
      Math.floor(timedelta / (60 * 1000)),
      Math.floor((timedelta % (60 * 1000)) / 1000),
      Math.floor((timedelta % 1000) / 10),
    ].map((x) =>
      x.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
    );
    return `${mm}:${ss}:${ms}`;
  };

  useLayoutEffect(() => {
    const element = cardRef.current;

    if (!element) return;

    const currentPosition = element.getBoundingClientRect();
    if (prevPositionRef.current) {
      const prevPosition = prevPositionRef.current;
      const deltaX = prevPosition.left - currentPosition.left;
      const deltaY = prevPosition.top - currentPosition.top;

      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      element.style.transition = "transform 0s";

      requestAnimationFrame(() => {
        element.style.transform = "";
        element.style.transition = "transform 0.5s ease";
      });
    }

    prevPositionRef.current = currentPosition;
  }, [index]);

  const hexToRGB = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const getChangeRank = () => {
    return team.prevRank - team.rank;
  };

  const getChangeRankImg = () => {
    if (getChangeRank() < 0) {
      return "down.png";
    }
    if (getChangeRank() > 0) {
      return "up.png";
    }
    return "no-changed.png";
  };

  const getBackgroundColor = () => {
    if (getChangeRank() < 0) {
      return "#FF0000";
    }
    if (getChangeRank() > 0) {
      return "#00FF00";
    }
    return "#eee";
  };

  const calculateScore = (remainingTime) => {
    return 10 * 60 * 1000 - remainingTime;
  };

  return (
    <>
      <Card
        ref={cardRef}
        variant="outlined"
        sx={{
          backgroundColor: hexToRGB(team.color, 0.3),
          borderRadius: 5,
          marginBottom: 2,
        }}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={3}>
            <img height="100px" src={`/images/${team.rank + 1}.png`} alt="순위" />
            <Typography variant="h2" textAlign="center">
              {team.name}
            </Typography>
            {team.score > 0 && (
              <Stack>
                <Typography textAlign="right">
                  게임: {formatTimeDelta(calculateScore(localStorage.getItem(team.name)))}
                </Typography>
                <Typography>퀴즈: {quiz}</Typography>
              </Stack>
            )}
            <Box sx={{ flexGrow: 1 }} />
            {team.score > 0 && <Typography variant="h3">{team.score}</Typography>}
            <Card
              sx={{
                backgroundColor: getBackgroundColor(),
                borderRadius: 5,
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img height="50px" src={`/images/${getChangeRankImg()}`} alt="변화" />
              </CardContent>
            </Card>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
