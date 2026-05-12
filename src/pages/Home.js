import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home-page">
      <div className="hero-card">
        <p className="eyebrow">Educational Timeline Game</p>

        <h1>Test your history knowledge with Timele</h1>

        <p className="hero-text">
          Guess the year of famous historical, technology, science, sports, and
          entertainment events. The game tells you if your guess is too early or
          too late until you find the correct year.
        </p>

        <div className="hero-actions">
          <Link to="/play" className="primary-link">
            Start Playing
          </Link>

          <Link to="/leaderboard" className="secondary-link">
            View Leaderboard
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;