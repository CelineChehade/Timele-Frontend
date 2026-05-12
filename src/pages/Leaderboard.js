const demoPlayers = [
  { id: 1, username: "Celine", score: 120 },
  { id: 2, username: "Teammate", score: 100 },
  { id: 3, username: "Alex", score: 80 },
  { id: 4, username: "Maya", score: 60 },
  { id: 5, username: "Omar", score: 40 }
];

function Leaderboard() {
  return (
    <section>
      <div className="page-heading">
        <h1>Leaderboard</h1>
        <p>Top players ranked by total score.</p>
      </div>

      <div className="leaderboard-card">
        {demoPlayers.map((player, index) => (
          <div key={player.id} className="leaderboard-row">
            <span className="rank">#{index + 1}</span>
            <span>{player.username}</span>
            <strong>{player.score} pts</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Leaderboard;