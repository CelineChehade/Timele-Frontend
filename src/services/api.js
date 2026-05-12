import api from "./api";

export async function getRandomEvent(category) {
  const response = await api.get("/events/random", {
    params: {
      category: category
    }
  });

  return response.data;
}

export async function submitGuess(eventId, guessedYear) {
  const response = await api.post("/guesses", {
    eventId: eventId,
    guessedYear: guessedYear
  });

  return response.data;
}

export async function createEvent(eventData) {
  const response = await api.post("/events", eventData);
  return response.data;
}

export async function getLeaderboard() {
  const response = await api.get("/leaderboard");
  return response.data;
}