import { ArrowBack, PanoramaFishEye, PlayArrow, Stop } from "@mui/icons-material";
import { Backdrop, Box, Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function TimerPage() {
  const [remainingTime, setRemainingTime] = useState(10 * 60 * 1000);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [numberColor, setNumberColor] = useState("#000000");
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

        if (remainingTime <= 1 * 60 * 1000) {
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
    <>
      <Card
        sx={{
          height: "80vh",
          width: "1000px",
          borderRadius: 10,
          backgroundColor: "rgba(238, 238, 238, 0.9)",
          alignItems: "center",
          display: "flex",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "80%",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={3}>
            <PanoramaFishEye sx={{ color: color, fontSize: "100px" }} />
            <Typography variant="h2">{team}</Typography>
          </Stack>

          <Typography fontSize="150px" textAlign="center" color={numberColor}>
            {formatTimeDelta(remainingTime)}
          </Typography>

          <Box>
            {isRunning ? (
              <IconButton onClick={onStop}>
                <Stop sx={{ fontSize: "100px" }} />
              </IconButton>
            ) : (
              <IconButton onClick={onRun}>
                <PlayArrow sx={{ fontSize: "100px" }} />
              </IconButton>
            )}
          </Box>
        </CardContent>
      </Card>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isFinish}
      >
        <IconButton onClick={goBackAndSave} sx={{ bgcolor: color, color: "#FFFFFF" }}>
          <ArrowBack sx={{ fontSize: "100px" }} />
        </IconButton>
      </Backdrop>
    </>
  );
}
