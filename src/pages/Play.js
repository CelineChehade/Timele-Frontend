import { useState } from "react";
import sampleEvents from "../data/sampleEvents";

function getRandomEvent(usedIds) {
  const availableEvents = sampleEvents.filter(
    (event) => !usedIds.includes(event.id)
  );

  if (availableEvents.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableEvents.length);

  return availableEvents[randomIndex];
}

function Play() {
  const [usedIds, setUsedIds] = useState([]);

  const firstEvent = getRandomEvent([]);

  const [currentEvent, setCurrentEvent] = useState(firstEvent);

  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");

  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const [isCorrect, setIsCorrect] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  function handleGuess(event) {
    event.preventDefault();

    const guessedYear = Number(guess);

    if (!guess) {
      setFeedback("Please enter a year.");
      return;
    }

    if (guessedYear < currentEvent.year) {
      setFeedback("Too early! Try a later year.");
      setAttempts(attempts + 1);
      setStreak(0);
    } else if (guessedYear > currentEvent.year) {
      setFeedback("Too late! Try an earlier year.");
      setAttempts(attempts + 1);
      setStreak(0);
    } else {
      const earnedPoints =
        currentEvent.difficulty === "Hard"
          ? 30
          : currentEvent.difficulty === "Medium"
          ? 20
          : 10;

      setFeedback(`Correct! The answer was ${currentEvent.year}.`);

      setAttempts(attempts + 1);

      setScore(score + earnedPoints);

      setStreak(streak + 1);

      setIsCorrect(true);
    }

    setGuess("");
  }

  function handleNextEvent() {
    const updatedUsedIds = [...usedIds, currentEvent.id];

    setUsedIds(updatedUsedIds);

    const nextEvent = getRandomEvent(updatedUsedIds);

    if (!nextEvent) {
      setGameFinished(true);
      return;
    }

    setCurrentEvent(nextEvent);

    setGuess("");
    setFeedback("");
    setAttempts(0);
    setIsCorrect(false);
  }

  function handleSkip() {
    handleNextEvent();
  }

  function getDifficultyClass() {
    if (currentEvent.difficulty === "Hard") {
      return "difficulty hard";
    }

    if (currentEvent.difficulty === "Medium") {
      return "difficulty medium";
    }

    return "difficulty easy";
  }

  if (gameFinished) {
    return (
      <section className="play-page">
        <div className="game-card">
          <h1>Game Complete</h1>

          <p>You finished all available events.</p>

          <div className="stats">
            <p>Final Score: {score}</p>
            <p>Best Streak: {streak}</p>
          </div>

          <button onClick={() => window.location.reload()}>
            Play Again
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