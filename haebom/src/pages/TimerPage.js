import { ArrowBack, PanoramaFishEye, PlayArrow, Stop } from "@mui/icons-material";
import { Backdrop, Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function TimerPage() {
  const [remainingTime, setRemainingTime] = useState(10 * 60 * 1000);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [numberColor, setNumberColor] = useState("#FFFFFF");
  const interval = useRef();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { team } = useParams();
  const color = searchParams.get("color");
  const audioRef = useRef(null);

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

  useEffect(() => {
    audioRef.current = new Audio("/musics/bgm1.mp3");
    audioRef.current.load();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isRunning) {
      interval.current = setInterval(() => {
        setRemainingTime((prev) => Math.max(prev - 10, 0));

        if (remainingTime <= 0) {
          onStop();
        } else if (remainingTime <= 1 * 60 * 1000) {
          setNumberColor("#FF0000");
        } else if (remainingTime <= 5 * 60 * 1000) {
          setNumberColor("#FF8000");
        }
      }, 10);
    } else {
      clearInterval(interval.current);
    }
    return () => clearInterval(interval.current);
  }, [isRunning, remainingTime]);

  const onRun = () => {
    setIsRunning(true);
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.loop = true;
    }
  };

  const onStop = () => {
    setIsRunning(false);
    setIsFinish(true);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const goBackAndSave = () => {
    localStorage.setItem(team, remainingTime);
    navigate("/");
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        backgroundImage: "url('/images/game.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 0,
        }}
      ></div>

      <Stack direction="row" alignItems="center" spacing={3} style={{ zIndex: 1 }}>
        <PanoramaFishEye sx={{ color: color, fontSize: "100px" }} />
        <Typography variant="h2" style={{ color: "#FFFFFF" }}>
          {team}
        </Typography>
      </Stack>

      <Typography fontSize="150px" textAlign="center" style={{ color: numberColor, zIndex: 1 }}>
        {formatTimeDelta(remainingTime)}
      </Typography>

      <Box style={{ zIndex: 1 }}>
        {isRunning ? (
          <IconButton onClick={onStop}>
            <Stop sx={{ fontSize: "100px", color: "#FFFFFF" }} />
          </IconButton>
        ) : (
          <IconButton onClick={onRun}>
            <PlayArrow sx={{ fontSize: "100px", color: "#FFFFFF" }} />
          </IconButton>
        )}
      </Box>

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isFinish}
      >
        <IconButton onClick={goBackAndSave} sx={{ bgcolor: color, color: "#FFFFFF" }}>
          <ArrowBack sx={{ fontSize: "100px" }} />
        </IconButton>
      </Backdrop>
    </div>
  );
}
