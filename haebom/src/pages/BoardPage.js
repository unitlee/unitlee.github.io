import { Backdrop, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardCard from "../components/BoardCard";

export default function BoardPage({ teams }) {
  const [disabledTeams, setDisabledTeams] = useState([]);
  const [isFinish, setIsFinish] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTeams = teams.filter((team) => localStorage.getItem(team.name) !== null);
    setDisabledTeams(savedTeams.map((team) => team.name));

    if (savedTeams.length === teams.length) {
      setIsFinish(true);
    }
  }, [teams]);

  return (
    <>
      <Container sx={{ width: "1000px" }}>
        <Stack spacing={5}>
          {teams.map((team, idx) => (
            <BoardCard key={idx} team={team} disabled={disabledTeams.includes(team.name)} />
          ))}
        </Stack>
      </Container>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isFinish}
      >
        {isHover ? (
          <img
            style={{ cursor: "pointer" }}
            onMouseOut={() => setIsHover(false)}
            onClick={() => navigate("/ranking")}
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
