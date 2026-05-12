import { useState } from "react";
import { getRandomEvent, submitGuess } from "../services/eventService";
const categories = [
  "All",
  "History",
  "Technology",
  "Science",
  "Books",
  "Gaming"
];

function Play() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [gameStarted, setGameStarted] = useState(false);

  const [currentEvent, setCurrentEvent] = useState(null);

  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");

  const [attempts, setAttempts] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);

  const [score, setScore] = useState(0);

  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const [isCorrect, setIsCorrect] = useState(false);

  const [gameFinished, setGameFinished] = useState(false);

  async function startGame() {
    try {
      const firstEvent = await getRandomEvent(selectedCategory);

      setCurrentEvent(firstEvent);

      setGuess("");

      setFeedback("");

      setAttempts(0);

      setTotalAttempts(0);

      setScore(0);

      setStreak(0);

      setBestStreak(0);

      setIsCorrect(false);

      setGameFinished(false);

      setGameStarted(true);
    } catch (error) {
      console.error(error);

      setFeedback("No events available.");
    }
  }
async function handleGuess(event) {
  event.preventDefault();

  const guessedYear = Number(guess);

  if (!guess) {
    setFeedback("Please enter a year.");
    return;
  }

  try {
    const result = await submitGuess(currentEvent.id, guessedYear);

    setFeedback(result.message);

    setAttempts(attempts + 1);
    setTotalAttempts(totalAttempts + 1);

    if (result.result === "Correct") {
      const newStreak = streak + 1;

      setScore(score + result.pointsEarned);
      setStreak(newStreak);

      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }

      setIsCorrect(true);
    } else {
      setStreak(0);
    }

    setGuess("");
  } catch (error) {
    console.error(error);
    setFeedback("Could not submit guess.");
  }
}

  async function handleNextEvent() {
    try {
      const nextEvent = await getRandomEvent(selectedCategory);

      setCurrentEvent(nextEvent);

      setGuess("");

      setFeedback("");

      setAttempts(0);

      setIsCorrect(false);
    } catch (error) {
      console.error(error);

      setGameFinished(true);
    }
  }

  function handleSkip() {
    setStreak(0);

    handleNextEvent();
  }

  function getDifficultyClass() {
    if (!currentEvent) {
      return "difficulty easy";
    }

    if (currentEvent.difficulty === "Hard") {
      return "difficulty hard";
    }

    if (currentEvent.difficulty === "Medium") {
      return "difficulty medium";
    }

    return "difficulty easy";
  }

  if (!gameStarted) {
    return (
      <section className="play-page">
        <div className="game-card">
          <h1>Start a Timele Round</h1>

          <p className="game-description">
            Choose a category, then guess the year of each event. The game will
            tell you if your guess is too early or too late.
          </p>

          <label className="category-label">Category</label>

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>

          <button onClick={startGame} className="start-button">
            Start Game
          </button>

          {feedback && <p className="feedback">{feedback}</p>}
        </div>
      </section>
    );
  }

  if (gameFinished) {
    return (
      <section className="play-page">
        <div className="game-card">
          <h1>Game Complete</h1>

          <p>You finished all events in this category.</p>

          <div className="final-stats">
            <div>
              <span>Final Score</span>
              <strong>{score}</strong>
            </div>

            <div>
              <span>Total Attempts</span>
              <strong>{totalAttempts}</strong>
            </div>

            <div>
              <span>Best Streak</span>
              <strong>{bestStreak}</strong>
            </div>
          </div>

          <button onClick={() => setGameStarted(false)}>
            Play Another Round
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="play-page">
      <div className="game-card">
        <div className="game-header">
          <span>{currentEvent.category}</span>

          <span className={getDifficultyClass()}>
            {currentEvent.difficulty}
          </span>
        </div>

        <h1>Guess the Year</h1>

        <p className="event-title">{currentEvent.title}</p>

        <form onSubmit={handleGuess} className="guess-form">
          <input
            type="number"
            placeholder="Enter year..."
            value={guess}
            onChange={(event) => setGuess(event.target.value)}
            disabled={isCorrect}
          />

          <button type="submit" disabled={isCorrect}>
            Submit Guess
          </button>
        </form>

        {feedback && (
          <p className={isCorrect ? "feedback correct" : "feedback"}>
            {feedback}
          </p>
        )}

        <div className="stats">
          <p>Attempts: {attempts}</p>

          <p>Score: {score}</p>

          <p>Streak: {streak}</p>
        </div>

        <div className="game-actions">
          {isCorrect && (
            <button onClick={handleNextEvent}>
              Next Event
            </button>
          )}

          {!isCorrect && (
            <button onClick={handleSkip} className="skip-button">
              Skip
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Play;