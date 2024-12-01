import { Backdrop, Container, Stack } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import RankCard from "../components/RankCard";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export default function RankingPage({ initialTeams }) {
  const [currentIndex, setCurrentIndex] = useState(initialTeams.length);
  const [isFirst, setIsFirst] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const [teams, setTeams] = useState(() => {
    return initialTeams.map((team) => ({
      ...team,
      score: 0,
      prevRank: 0,
      rank: 0,
    }));
  });
  const audioRef = useRef(null);
  const [isFinish, setIsFinish] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    audioRef.current = new Audio("/musics/drum-roll.mp3");
    audioRef.current.load();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const calculateScore = (remainingTime) => {
    const minutesLeft = Math.floor(remainingTime / (60 * 1000));
    return Math.max(0, 10 * (minutesLeft + 1));
  };

  useEffect(() => {
    if (currentIndex === initialTeams.length) {
      setIsFinish(true);
      return;
    }

    const updateRank = setInterval(() => {
      const nextTeams = initialTeams.map((team, idx) => ({
        ...team,
        score:
          idx <= currentIndex
            ? parseInt(calculateScore(localStorage.getItem(team.name))) +
              parseInt(localStorage.getItem(`${team.name}Quiz`))
            : 0,
        rank: 0,
        isFixed: false,
      }));

      const sortedTeams = nextTeams.sort((a, b) => {
        if (a.score === b.score) {
          return parseInt(localStorage.getItem(b.name)) - parseInt(localStorage.getItem(a.name));
        }
        return b.score - a.score;
      });
      let rank = 0;

      for (const sortedTeam of sortedTeams) {
        for (const nextTeam of nextTeams) {
          if (nextTeam.isFixed) {
            continue;
          }
          if (sortedTeam.score === nextTeam.score) {
            nextTeam.rank = rank;
            nextTeam.isFixed = true;
            rank++;
          }
        }
      }

      for (const nextTeam of nextTeams) {
        for (const team of teams) {
          if (nextTeam.name === team.name) {
            nextTeam.prevRank = team.rank;
          }
        }
      }

      setCurrentIndex(currentIndex + 1);
      setTeams(nextTeams);
    }, 1000);

    return () => clearInterval(updateRank);
  }, [currentIndex, teams, initialTeams]);

  return (
    <>
      <Container sx={{ width: "1500px" }}>
        <Stack spacing={5}>
          {teams.map((team, idx) => (
            <RankCard
              key={team.name}
              team={team}
              index={idx}
              quiz={localStorage.getItem(`${team.name}Quiz`)}
            />
          ))}
        </Stack>
      </Container>

      <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={isFirst}>
        {isHover ? (
          <img
            style={{ cursor: "pointer" }}
            onMouseOut={() => setIsHover(false)}
            onClick={() => {
              setIsFirst(false);
              setCurrentIndex(0);
              audioRef.current.play();
            }}
            src="/images/rank-color.png"
            alt="이미지"
          />
        ) : (
          <img onMouseOver={() => setIsHover(true)} src="/images/rank-outlined.png" alt="이미지" />
        )}
      </Backdrop>

      <Confetti width={width} height={height} run={isFinish} />
    </>
  );
}
