import { useState } from "react";
import "../App.css";
const PlantQuiz = () => {
  // Card data containing plant questions and answers
  const plantCards = [
    {
      question:
        "What is the best way to determine when to water most houseplants?",
      answer: "Check the top 1-2 inches of soil - water when it feels dry",
    },
    {
      question: "What does it mean when a plant's leaves turn yellow?",
      answer:
        "Usually overwatering, but could also be nutrient deficiency or insufficient light",
    },
    {
      question: "What is the purpose of drainage holes in plant pots?",
      answer:
        "To prevent water from pooling at the bottom, which can cause root rot",
    },
    {
      question: "How do you increase humidity for tropical plants?",
      answer:
        "Mist regularly, use a humidifier, place on a pebble tray, or group plants together",
    },
    {
      question:
        "What direction should a plant that needs 'bright indirect light' face?",
      answer:
        "North or east-facing windows, or a few feet away from south/west windows with sheer curtains",
    },
    {
      question: "What is the best time to repot most houseplants?",
      answer: "Spring or early summer when the plant is actively growing",
    },
    {
      question: "What are signs that a plant has outgrown its pot?",
      answer:
        "Roots growing through drainage holes, roots circling the surface, or frequent wilting despite proper watering",
    },
    {
      question: "How often should you fertilize most houseplants?",
      answer:
        "Every 4-6 weeks during growing season (spring and summer), rarely or never during winter",
    },
    {
      question:
        "What is the name for when plant leaves drop from sudden environmental changes?",
      answer: "Transplant shock",
    },
    {
      question: "Why do the tips of leaves sometimes turn brown?",
      answer:
        "Low humidity, too much fertilizer, or chemical buildup from tap water",
    },
  ];
  const [cardCount, setCardCount] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const handleCardClick = () => {
    setShowAnswer(!showAnswer);
  };
  const nextCard = () => {
    setShowAnswer(false);
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * plantCards.length); //clicking next button dispalys random
    } while (randomIndex === cardCount && plantCards.length > 1);
    setCardCount(randomIndex);
  };
  const handleRestart = () => {
    setCardCount(0);
    setShowAnswer(false);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>The Ultimate Plant Parent!</h1>
        <p className="quiz-description">
          How good of a plant parent are you? Test all of your planty knowledge
          here!
        </p>
        <p className="card-count">Number of cards: {plantCards.length}</p>
      </div>

      <div className="card question-card" onClick={handleCardClick}>
        <div className="card-content">
          <p className="card-type">
            {showAnswer ? "Answer:" : "Question:"} (Card {cardCount + 1} of{" "}
            {plantCards.length})
          </p>
          <p className="card-text">
            {showAnswer
              ? plantCards[cardCount].answer
              : plantCards[cardCount].question}
          </p>
        </div>
      </div>

      <div className="button-container">
        <button className="nav-button restart-button" onClick={handleRestart}>
          ↺
        </button>
        <button className="nav-button next-button" onClick={nextCard}>
          →
        </button>
      </div>
    </div>
  );
};

export default PlantQuiz;
