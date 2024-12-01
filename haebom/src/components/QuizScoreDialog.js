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
  const [fourth, setFourth] = useState(null);
  const [fifth, setFifth] = useState(null);

  const handleConfirm = () => {
    localStorage.setItem(`${first}Quiz`, 100);
    localStorage.setItem(`${second}Quiz`, 90);
    localStorage.setItem(`${third}Quiz`, 80);
    localStorage.setItem(`${fourth}Quiz`, 70);
    localStorage.setItem(`${fifth}Quiz`, 60);
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
              <Select value={first} onChange={(e) => setFirst(e.target.value)}>
                {teams.map((team, idx) => (
                  <MenuItem value={team.name} key={idx}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PanoramaFishEye sx={{ color: team.color }} />
                      <Typography>{team.name}</Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
              <Typography>100점</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <img height="50px" src={`/images/2.png`} alt="순위" />
              <Select value={second} onChange={(e) => setSecond(e.target.value)}>
                {teams.map((team, idx) => (
                  <MenuItem value={team.name} key={idx}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PanoramaFishEye sx={{ color: team.color }} />
                      <Typography>{team.name}</Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
              <Typography>90점</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <img height="50px" src={`/images/3.png`} alt="순위" />
              <Select value={third} onChange={(e) => setThird(e.target.value)}>
                {teams.map((team, idx) => (
                  <MenuItem value={team.name} key={idx}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PanoramaFishEye sx={{ color: team.color }} />
                      <Typography>{team.name}</Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
              <Typography>80점</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <img height="50px" src={`/images/4.png`} alt="순위" />
              <Select value={fourth} onChange={(e) => setFourth(e.target.value)}>
                {teams.map((team, idx) => (
                  <MenuItem value={team.name} key={idx}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PanoramaFishEye sx={{ color: team.color }} />
                      <Typography>{team.name}</Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
              <Typography>70점</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <img height="50px" src={`/images/5.png`} alt="순위" />
              <Select value={fifth} onChange={(e) => setFifth(e.target.value)}>
                {teams.map((team, idx) => (
                  <MenuItem value={team.name} key={idx}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PanoramaFishEye sx={{ color: team.color }} />
                      <Typography>{team.name}</Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
              <Typography>60점</Typography>
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
