import { useState } from "react";
import "../App.css";

const PlantQuiz = () => {
  const plantCards = [
    {
      question:
        "What is the best way to determine when to water most houseplants?",
      answer: "soil",
    },
    {
      question: "What does it mean when a plant's leaves turn yellow?",
      answer: "overwatering",
    },
    {
      question: "What is the purpose of drainage holes in plant pots?",
      answer: "drainage",
    },
    {
      question: "How do you increase humidity for tropical plants?",
      answer: "mist",
    },
    {
      question:
        "What direction should a plant that needs 'bright indirect light' face?",
      answer: "east",
    },
    {
      question: "What is the best time to repot most houseplants?",
      answer: "spring",
    },
    {
      question: "What are signs that a plant has outgrown its pot?",
      answer: "rootbound",
    },
    {
      question: "How often should you fertilize most houseplants?",
      answer: "monthly",
    },
    {
      question:
        "What is the name for when plant leaves drop from sudden environmental changes?",
      answer: "shock",
    },
    {
      question: "Why do the tips of leaves sometimes turn brown?",
      answer: "stress",
    },
  ];

  const [cards, setCards] = useState(plantCards);
  const [cardIndex, setCardIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [answered, setAnswered] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [masteredCards, setMasteredCards] = useState([]);

  const isAnswerCorrect = (userAnswer, correctAnswer) => {
    return (
      userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answered) return;
    const currentCard = cards[cardIndex];
    if (isAnswerCorrect(guess, currentCard.answer)) {
      setFeedback("Correct!");
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }
    } else {
      setFeedback(`Incorrect. Correct answer: ${currentCard.answer}`);
      setCurrentStreak(0);
    }
    setAnswered(true);
  };

  const nextCard = () => {
    setFeedback("");
    setGuess("");
    setAnswered(false);
    if (cardIndex < cards.length - 1) {
      setCardIndex(cardIndex + 1);
    } else {
      setCardIndex(0);
    }
  };

  const prevCard = () => {
    setFeedback("");
    setGuess("");
    setAnswered(false);
    if (cardIndex > 0) {
      setCardIndex(cardIndex - 1);
    }
  };

  const shuffleCards = () => {
    setFeedback("");
    setGuess("");
    setAnswered(false);
    let shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCards(shuffled);
    setCardIndex(0);
  };

  const handleRestart = () => {
    setCards(plantCards);
    setCardIndex(0);
    setGuess("");
    setFeedback("");
    setAnswered(false);
    setCurrentStreak(0);
  };

  const markMastered = () => {
    const currentCard = cards[cardIndex];
    setMasteredCards([...masteredCards, currentCard]);
    const updatedCards = cards.filter((card, index) => index !== cardIndex);
    setCards(updatedCards);
    if (cardIndex >= updatedCards.length) {
      setCardIndex(0);
    }
    setFeedback("");
    setGuess("");
    setAnswered(false);
  };

  if (cards.length === 0) {
    return (
      <div className="quiz-container">
        <h1>You've mastered all the cards!</h1>
        <button className="nav-button" onClick={handleRestart}>
          Restart Quiz
        </button>
        {masteredCards.length > 0 && (
          <div className="mastered-cards">
            <h2>Mastered Cards:</h2>
            <ul>
              {masteredCards.map((card, index) => (
                <li key={index}>{card.question}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>The Ultimate Plant Parent!</h1>
        <p className="quiz-description">
          How good of a plant parent are you? Test all of your planty knowledge
          here!
        </p>
        <p className="card-count">Cards remaining: {cards.length}</p>
        <p className="streak">
          Current Streak: {currentStreak} | Longest Streak: {longestStreak}
        </p>
      </div>
      <div className="card question-card">
        <div className="card-content">
          <p className="card-type">
            Question: (Card {cardIndex + 1} of {cards.length})
          </p>
          <p className="card-text">{cards[cardIndex].question}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="guess-form">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter your guess"
          disabled={answered}
        />
        <button type="submit" disabled={answered || guess.trim() === ""}>
          Submit
        </button>
      </form>
      {feedback && (
        <p
          className={`feedback ${
            feedback === "Correct!" ? "correct" : "incorrect"
          }`}
        >
          {feedback}
        </p>
      )}
      <div className="button-container">
        <button
          className="nav-button"
          onClick={prevCard}
          disabled={cardIndex === 0}
        >
          ← Back
        </button>
        <button className="nav-button" onClick={nextCard}>
          Next →
        </button>
        <button className="nav-button" onClick={shuffleCards}>
          Shuffle
        </button>
      </div>
      <button className="nav-button mastered-button" onClick={markMastered}>
        Mark as Mastered
      </button>
      <button className="nav-button restart-button" onClick={handleRestart}>
        Restart
      </button>
      {masteredCards.length > 0 && (
        <div className="mastered-cards">
          <h2>Mastered Cards:</h2>
          <ul>
            {masteredCards.map((card, index) => (
              <li key={index}>{card.question}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlantQuiz;
