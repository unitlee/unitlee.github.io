import { PanoramaFishEye } from "@mui/icons-material";
import { DialogContentText, MenuItem, Select, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function QuizScoreDialog({ teams, open, setOpen }) {
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [third, setThird] = useState(null);

  const handleConfirm = () => {
    for (const team of teams) {
      localStorage.setItem(`${team.name}Quiz`, 0);
    }
    localStorage.setItem(`${first}Quiz`, 60 * 1000);
    localStorage.setItem(`${second}Quiz`, 30 * 1000);
    localStorage.setItem(`${third}Quiz`, 15 * 1000);
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>퀴즈 등수 등록</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <img height="50px" src={`/images/1.png`} alt="순위" />
              <Select value={first} label="1등" onChange={(e) => setFirst(e.target.value)}>
                {teams.map((team, idx) => (
                  <MenuItem value={team.name} key={idx}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PanoramaFishEye sx={{ color: team.color }} />
                      <Typography>{team.name}</Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
              <Typography>1분 차감</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <img height="50px" src={`/images/2.png`} alt="순위" />
              <Select value={second} label="2등" onChange={(e) => setSecond(e.target.value)}>
                {teams.map((team, idx) => (
                  <MenuItem value={team.name} key={idx}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PanoramaFishEye sx={{ color: team.color }} />
                      <Typography>{team.name}</Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
              <Typography>30초 차감</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <img height="50px" src={`/images/3.png`} alt="순위" />
              <Select value={third} label="3등" onChange={(e) => setThird(e.target.value)}>
                {teams.map((team, idx) => (
                  <MenuItem value={team.name} key={idx}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PanoramaFishEye sx={{ color: team.color }} />
                      <Typography>{team.name}</Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
              <Typography>15초 차감</Typography>
            </Stack>
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} autoFocus>
          등록
        </Button>
      </DialogActions>
    </Dialog>
  );
}
