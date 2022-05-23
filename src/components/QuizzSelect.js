import React, { useState } from 'react';
import Card from './Card';
import Select from './Select';

const QuizzSelect = () => {
  const [data, setData] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState('');
  const [isStart, setIsStart] = useState(false);
  const [quizzIsOn, setQuizzIsOn] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [resultQuizz, setResultQuizz] = useState(0);
  const [displayScore, setDisplayScore] = useState(false);

  const numberMaxQuestion = 5;

  // Filter on regarding continent selection
  const filterDataContinent = data.filter((country) =>
    country.continents[0].includes(selectedRadio)
  );

  // Get 3 randomIndex from filterData
  let randomIndex = [];

  if (filterDataContinent.length > 0) {
    while (randomIndex.length < 3) {
      const r = Math.floor(Math.random() * filterDataContinent.length);
      if (randomIndex.indexOf(r) === -1) randomIndex.push(r);
    }
  }

  const rewards = (param) => {
    if (param < 4) {
      return 'Too bad you need more training';
    } else if (param < 7) {
      return 'Good Job';
    } else {
      return 'Wonderful';
    }
  };

  console.log('rerender');

  return (
    <div className="quizz">
      <Select
        setData={setData}
        selectedRadio={selectedRadio}
        setSelectedRadio={setSelectedRadio}
        isStart={isStart}
      />

      <div className="start-quizz">
        {!quizzIsOn ? (
          !selectedRadio ? (
            <p>Please Choose your Continent</p>
          ) : (
            <button
              onClick={() => {
                setIsStart(true);
                setQuizzIsOn(true);
              }}
            >
              Start
            </button>
          )
        ) : !displayScore ? (
          <div>
            <h4>To Which Country belongs this Flag ?</h4>
            {filterDataContinent.length > 0 && (
              <Card
                country={filterDataContinent[randomIndex[0]]}
                otherCountry2={filterDataContinent[randomIndex[1]]}
                otherCountry3={filterDataContinent[randomIndex[2]]}
                setNextQuestion={setNextQuestion}
                nextQuestion={nextQuestion}
                setResultQuizz={setResultQuizz}
                numberMaxQuestion={numberMaxQuestion}
                setDisplayScore={setDisplayScore}
              />
            )}
            <button
              className="stop-quizz"
              onClick={() => {
                setIsStart(false);
                setSelectedRadio('');
                setQuizzIsOn(false);
              }}
            >
              Restart Quizz
            </button>
          </div>
        ) : (
          <div className="score">
            <h3>{rewards(resultQuizz)} !</h3>
            <p>
              You score is {resultQuizz}/ {numberMaxQuestion}
            </p>
            <button
              onClick={() => {
                setResultQuizz(0);
                setDisplayScore(false);
              }}
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizzSelect;
