import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { countries } from '../features/userSlice';
import Card from './Card';
import Select from './Select';

const Countries = () => {
  const [rangeValue, setRangeValue] = useState(36);
  const [selectedRadio, setSelectedRadio] = useState('');
  const data = useSelector(countries);
  return (
    <div className="countries">
      <Select
        component="countries"
        rangeValue={rangeValue}
        setRangeValue={setRangeValue}
        selectedRadio={selectedRadio}
        setSelectedRadio={setSelectedRadio}
      />

      {selectedRadio && (
        <button onClick={() => setSelectedRadio([])}>
          Annuler la recherche
        </button>
      )}
      <ul>
        {[...data]
          .sort((a, b) => b.population - a.population)
          .filter((country) => country.continents[0].includes(selectedRadio))
          .slice(0, rangeValue)
          .map((country, index) => (
            <Card key={index} country={country} component="countries" />
          ))}
      </ul>
    </div>
  );
};

export default Countries;
