import { Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardCard from "../components/BoardCard";

export default function BoardPage({ teams }) {
  const [disabledTeams, setDisabledTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTeams = teams.filter((team) => localStorage.getItem(team.name) !== null);
    setDisabledTeams(savedTeams.map((team) => team.name));

    if (savedTeams.length === teams.length) {
      navigate("/ranking");
    }
  }, [navigate, teams]);

  return (
    <Container sx={{ width: "1000px" }}>
      <Stack spacing={5}>
        {teams.map((team, idx) => (
          <BoardCard key={idx} team={team} disabled={disabledTeams.includes(team.name)} />
        ))}
      </Stack>
    </Container>
  );
}
