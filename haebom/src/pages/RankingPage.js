import { Link } from "react-router-dom";

export default function RankingPage() {
  return (
    <div>
      <h1>Ranking Page</h1>
      <Link to="/">board</Link>
      <br />
      <Link to="/timer/team">Timer</Link>
      <br />
      <Link to="/ranking">Ranking</Link>
    </div>
  );
}
