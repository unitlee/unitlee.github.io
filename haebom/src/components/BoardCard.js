import { PanoramaFishEye } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function BoardCard({ title, color, disabled }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate({
      pathname: `/timer/${title}`,
      search: createSearchParams({ color: color }).toString(),
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
            <PanoramaFishEye sx={{ color: { color }, fontSize: "100px" }} />
            <Typography variant="h2" textAlign="center">
              {title}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
