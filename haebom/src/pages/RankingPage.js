import { Backdrop, Container, Stack } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import RankCard from "../components/RankCard";

export default function RankingPage({ initialTeams }) {
  const [currentIndex, setCurrentIndex] = useState(initialTeams.length);
  const [isFirst, setIsFirst] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const [teams, setTeams] = useState(() => {
    return initialTeams.map((team) => ({
      ...team,
      time: 10 * 60 * 1000,
      prevRank: 0,
      rank: 0,
    }));
  });
  const audioRef = useRef(null);

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

  useEffect(() => {
    if (currentIndex === initialTeams.length) {
      return;
    }

    const updateRank = setInterval(() => {
      const nextTeams = initialTeams.map((team, idx) => ({
        ...team,
        time:
          idx <= currentIndex ? 10 * 60 * 1000 - localStorage.getItem(team.name) : 10 * 60 * 1000,
        rank: 0,
        isFixed: false,
      }));

      const sortedTeams = nextTeams.sort((a, b) => a.time - b.time);
      let rank = 0;

      for (const sortedTeam of sortedTeams) {
        let cnt = 0;
        for (const nextTeam of nextTeams) {
          if (nextTeam.isFixed) {
            continue;
          }
          if (sortedTeam.time === nextTeam.time) {
            nextTeam.rank = rank;
            nextTeam.isFixed = true;
            cnt++;
          }
        }

        rank += cnt;
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
      <Container sx={{ width: "1000px" }}>
        <Stack spacing={5}>
          {teams.map((team, idx) => (
            <RankCard key={team.name} team={team} index={idx} />
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
    </>
  );
}
