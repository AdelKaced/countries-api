import React, { useEffect, useState } from 'react';

const Card = ({
  component,
  country,
  otherCountry2,
  otherCountry3,
  setNextQuestion,
  nextQuestion,
  setCountGoodAnswer,
  setIsMaxQuestion,
  numberMaxQuestion
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isValidate, setIsValidate] = useState(false);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false);
  const [randomInput, setRandomInput] = useState('');
  const [countQuestion, setCountQuestion] = useState(1);
  const [countCorrectAnswers, setCountCorrectAnswers] = useState(0);

  // put all country data on array to create esealy input
  const inputs = [country, otherCountry2, otherCountry3];
  // mix the array to get different order

  const checkAnswer = () => {
    if (selectedAnswer) {
      setIsValidate(true);
      // change answerIsCorrect to True when response is correct
      setAnswerIsCorrect(country.name.common === selectedAnswer);
      if (country.name.common === selectedAnswer)
        setCountCorrectAnswers(countCorrectAnswers + 1);

      if (countQuestion >= numberMaxQuestion) {
        setCountGoodAnswer(countCorrectAnswers);
        setIsMaxQuestion(true); 
      }
    }
  };

  // Sort Input data to change the order of right answer
  useEffect(() => {
    setRandomInput(inputs.sort(() => Math.random() - 0.5));
  }, [nextQuestion]);

  return (
    <div>
      <li className={component === 'countries' ? 'card hover' : 'card'}>
        {countCorrectAnswers} / {countQuestion}
        <img src={country.flags.svg} alt="flag" />
        {component === 'countries' ? (
          <div className="infos">
            <h2>{country.name.common}</h2>
            <h4>{country.capital}</h4>
            <p>Pop: {country.population.toLocaleString()}</p>
          </div>
        ) : (
          <div className="questions">
            {randomInput &&
              randomInput.map((question) => (
                <div className="input-question" key={question.name.common}>
                  <input
                    type="radio"
                    id={question.name.common}
                    name="question"
                    disabled={isValidate && !selectedAnswer ? true : false}
                    checked={
                      selectedAnswer === question.name.common ? true : false
                    }
                    onChange={(e) => setSelectedAnswer(e.target.id)}
                  />
                  <label
                    htmlFor="question"
                    className={
                      isValidate && question.name.common === country.name.common
                        ? 'right-answer'
                        : ''
                    }
                  >
                    {question.name.common}
                  </label>
                </div>
              ))}
            {!isValidate ? (
              <div>
                <button onClick={checkAnswer}>Validate</button>
              </div>
            ) : (
              <div>
                <button
                  onClick={(e) => {
                    setIsValidate(false);
                    setNextQuestion(!nextQuestion);
                    setCountQuestion(countQuestion + 1);
                    setSelectedAnswer(''); // delete selected answer after checking
                  }}
                >
                  Next Question
                </button>
                {answerIsCorrect ? <p>Good Answer !</p> : <p>Bad answer !</p>}
              </div>
            )}
          </div>
        )}
      </li>
    </div>
  );
};

export default Card;
