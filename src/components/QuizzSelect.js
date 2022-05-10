import React, { useState } from 'react';
import Card from './Card';
import Select from './Select';

const QuizzSelect = () => {
  // eslint-disable-next-line
  const [data, setData] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState('');
  // eslint-disable-next-line
  const [isStart, setIsStart] = useState(false);
  const [quizzIsOn, setQuizzIsOn] = useState(false);

  let filterData = [];
  if (data.length > 0)
    filterData = data.filter((country) =>
      country.continents[0].includes(selectedRadio)
    );
  let randomIndex = Math.floor(Math.random() * filterData.length);

  return (
    <div className="quizz">
      <Select
        component="quizz"
        setData={setData}
        selectedRadio={selectedRadio}
        setSelectedRadio={setSelectedRadio}
        isStart={isStart}
      />

      <div className="start-quizz">
        {!quizzIsOn ? (
          !selectedRadio ? (
            <p>Please Choose your Topic</p>
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
        ) : (
          <div>
            <h4>To Which Country belongs this Flag ?</h4>
            {filterData
              .filter((country, index) => index === randomIndex)

              // index ===
              // Math.floor(
              //   Math.random() *
              //     data.filter((country) =>
              //       country.continents.includes(selectedRadio)
              //     )
              // )

              .map((res) => (
                <Card component="quizz" country={res} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizzSelect;

// const [selectedTopic, setSelectedTopic] = useState('');
// //eslint-disable-next-line
// const [isStart, setIsStart] = useState(false);

// const topics = ['Flag',
//   {
//     topic: 'Flag',
//     image: '',
//     firstQuestion: '',
//     secQuestion: '',
//     thirdQuestion: '',
//   },
//   {
//     topic: 'Continent',
//     image: '',
//     firstQuestion: '',
//     secQuestion: '',
//     thirdQuestion: '',
//   },
//   {
//     topic: '',
//     image: '',
//     firstQuestion: '',
//     secQuestion: '',
//     thirdQuestion: '',
//   },
//   {
//     topic: 'Population',
//     image: '',
//     firstQuestion: '',
//     secQuestion: '',
//     thirdQuestion: '',
//   },
// ];

// return (
//   <div className="quizz">
//     <ul className="radio-container">
//       {topics.map((res) => (
//         <li>
//           <input
//             type="radio"
//             id={res.topic}
//             name={res.topic}
//             disabled={isStart && selectedTopic !== res.topic ? true : false}
//             checked={selectedTopic === topic ? true : false}
//             onChange={(e) => setSelectedTopic(e.target.id)}
//           />
//           <label htmtFor={topic}>{topic}</label>
//         </li>
//       ))}
//     </ul>
//     <div className="start-quizz">
//       {!selectedTopic ? (
//         <p>Please Choose your Topic</p>
//       ) : (
//         <button onClick={() => setIsStart(true)}>Start</button>
//       )}
//     </div>
//     {selectedTopic === ''}
//   </div>
// );
