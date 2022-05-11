import React, { useState } from 'react';

const Card = ({
  component,
  country,
  otherCountry2,
  otherCountry3,
  setNextQuestion,
  nextQuestion,
}) => {
  const [selectedAnwer, setSelectedAnswer] = useState('');
  const [isValidate, setIsValidate] = useState(false);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false);

  // put all country data on array to create esealy input
  const inputs = [country, otherCountry2, otherCountry3];

  const checkAnswer = () => {
    setIsValidate(true);
    console.log(country.name.common === selectedAnwer);
    // change answerIsCorrect to True when response is correct
    setAnswerIsCorrect(country.name.common === selectedAnwer);
  };

  return (
    <li className={component === 'countries' ? 'card hover' : 'card'}>
      <img src={country.flags.svg} alt="flag" />
      {component === 'countries' ? (
        <div className="infos">
          <h2>{country.name.common}</h2>
          <h4>{country.capital}</h4>
          <p>Pop: {country.population.toLocaleString()}</p>
        </div>
      ) : (
        <div className="questions">
          
          {inputs.map((question) => (
            <div className="input-question">
              <input
                type="radio"
                id={question.name.common}
                name="question"
                onChange={(e) => setSelectedAnswer(e.target.id)}
              />
              <label>{question.name.common}</label>
            </div>
          ))}
          {!isValidate ? (
            <button onClick={checkAnswer}>Validate</button>
          ) : answerIsCorrect ? (
            <div>
              <button onClick={(e) => {setIsValidate(false); setNextQuestion(!nextQuestion)}}>
                Next Question
              </button>
              <p>Bravo bonne Réponse !</p>
            </div>
          ) : (
            <div>
              <button onClick={checkAnswer}>Try Again</button>
              <p>Mauvaise Réponse !</p>
            </div>
          )}
        </div>
      )}
    </li>
  );
};

export default Card;
