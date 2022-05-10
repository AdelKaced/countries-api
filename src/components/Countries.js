import React, { useState} from 'react';
import Card from './Card';
import Select from './Select';

const Countries = () => {
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(36);
  const [selectedRadio, setSelectedRadio] = useState('');

  return (
    <div className="countries">
      <Select component='countries' rangeValue={rangeValue} setRangeValue={setRangeValue} selectedRadio={selectedRadio} setSelectedRadio={setSelectedRadio} setData={setData}/>

      {selectedRadio && (
        <button onClick={() => setSelectedRadio([])}>
          Annuler la recherche
        </button>
      )}
      <ul>
        {data
          .sort((a, b) => b.population - a.population)
          .filter((country) => country.continents[0].includes(selectedRadio))
          .slice(0, rangeValue)
          .map((country, index) => (
            <Card key={index} country={country} />
          ))}
      </ul>
    </div>
  );
};

export default Countries;
