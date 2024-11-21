import { Container, Stack } from "@mui/material";
import BoardCard from "../components/BoardCard";
import { useEffect, useState } from "react";

const teams = [
  { name: "그룹웨어기술팀", color: "#0081c8" },
  { name: "RPA추진팀", color: "#000000" },
  { name: "계정인증개발팀", color: "#ed334e" },
  { name: "EX서비스개발팀", color: "#fbb132" },
  { name: "EX플랫폼솔루션팀", color: "#1c8b3c" },
];

export default function BoardPage() {
  const [disabledTeams, setDisabledTeams] = useState([]);

  useEffect(() => {
    const savedTeams = teams.filter((team) => localStorage.getItem(team.name) !== null);
    setDisabledTeams(savedTeams.map((team) => team.name));
  }, []);

  return (
    <Container sx={{ width: "1000px" }}>
      <Stack spacing={5}>
        {teams.map((team) => (
          <BoardCard
            key={team.name}
            title={team.name}
            color={team.color}
            disabled={disabledTeams.includes(team.name)}
          />
        ))}
      </Stack>
    </Container>
  );
}
