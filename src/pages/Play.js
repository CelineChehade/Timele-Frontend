import { useState } from "react";
import sampleEvents from "../data/sampleEvents";

function getRandomEvent() {
  const randomIndex = Math.floor(Math.random() * sampleEvents.length);
  return sampleEvents[randomIndex];
}

function Play() {
  const [currentEvent, setCurrentEvent] = useState(getRandomEvent());
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

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
    } else if (guessedYear > currentEvent.year) {
      setFeedback("Too late! Try an earlier year.");
      setAttempts(attempts + 1);
    } else {
      setFeedback(`Correct! The answer was ${currentEvent.year}.`);
      setAttempts(attempts + 1);
      setScore(score + 10);
      setIsCorrect(true);
    }

    setGuess("");
  }

  function handleNextEvent() {
    setCurrentEvent(getRandomEvent());
    setGuess("");
    setFeedback("");
    setAttempts(0);
    setIsCorrect(false);
  }

  return (
    <section className="play-page">
      <div className="game-card">
        <div className="game-header">
          <span>{currentEvent.category}</span>
          <span>{currentEvent.difficulty}</span>
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
        </div>

        {isCorrect && (
          <button onClick={handleNextEvent} className="secondary-button">
            Next Event
          </button>
        )}
      </div>
    </section>
  );
}

export default Play;