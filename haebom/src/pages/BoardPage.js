import { Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardCard from "../components/BoardCard";
import QuizScoreDialog from "../components/QuizScoreDialog";

export default function BoardPage({ teams }) {
  const [disabledTeams, setDisabledTeams] = useState([]);
  const [quizScoreDialog, setQuizScoreDialog] = useState(false);
  const navigate = useNavigate();

  const isSetQuizScore = (teams) => {
    for (const team of teams) {
      if (!localStorage.getItem(`${team.name}Quiz`)) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const savedTeams = teams.filter((team) => localStorage.getItem(team.name) !== null);
    setDisabledTeams(savedTeams.map((team) => team.name));

    if (!isSetQuizScore(teams)) {
      setQuizScoreDialog(true);
    } else if (savedTeams.length === teams.length) {
      navigate("/ranking");
    }
  }, [navigate, teams]);

  return (
    <>
      <Container sx={{ width: "1000px" }}>
        <Stack spacing={5}>
          {teams.map((team, idx) => (
            <BoardCard key={idx} team={team} disabled={disabledTeams.includes(team.name)} />
          ))}
        </Stack>
      </Container>
      <QuizScoreDialog teams={teams} open={quizScoreDialog} setOpen={setQuizScoreDialog} />
    </>
  );
}
