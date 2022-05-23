import React, { useEffect, useState } from 'react';

const Card = ({
  country,
  otherCountry2,
  otherCountry3,
  setNextQuestion,
  nextQuestion,
  setResultQuizz,
  numberMaxQuestion,
  setDisplayScore,
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
    }
  };

  const handleDisplayScore = () => {
    setResultQuizz(countCorrectAnswers);
    setDisplayScore(true);
  };

  // Sort Input data to change the order of right answer
  useEffect(() => {
    setRandomInput(inputs.sort(() => Math.random() - 0.5));
    // eslint-disable-next-line 
  }, [nextQuestion]);

  return (
    <div>
      <li className={!numberMaxQuestion ? 'card hover' : 'card'}>
        <img src={country.flags.svg} alt="flag" />
        {!numberMaxQuestion ? (
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
                {countQuestion < numberMaxQuestion ? (
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
                ) : (
                  <button onClick={handleDisplayScore}>See My score</button>
                )}

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
