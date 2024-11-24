import { PanoramaFishEye } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function BoardCard({ team, disabled }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate({
      pathname: `/timer/${team.name}`,
      search: createSearchParams({ color: team.color }).toString(),
    });
  };

  const getBackgroundColor = () => {
    return disabled ? "rgba(128, 128, 128, 0.9)" : "rgba(238, 238, 238, 0.9)";
  };

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: getBackgroundColor(),
        borderRadius: 5,
      }}
    >
      <CardActionArea onClick={handleCardClick} disabled={disabled}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={3}>
            <PanoramaFishEye sx={{ color: team.color, fontSize: "100px" }} />
            <Typography variant="h2" textAlign="center">
              {team.name}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
