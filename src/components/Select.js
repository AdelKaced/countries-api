import React, { useEffect } from 'react';
import axios from 'axios';

const Select = ({
  setData,
  rangeValue,
  setRangeValue,
  selectedRadio,
  setSelectedRadio,
  isStart
}) => {

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((res) => {
      setData(res.data);
    });
  }, [setData]);

  const radios = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

  return (
    <div>
    
      <ul className="radio-container">
      {rangeValue && <input
          type="range"
          min="1"
          max="250"
          defaultValue={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)}
        />
      }
        {radios.map((continent) => (
          <li>
            <input
              type="radio"
              id={continent}
              name="continentRadio"
              disabled = {isStart && selectedRadio !== continent ? true: false}
              checked={continent === selectedRadio ? true : false}
              onChange={(e) => setSelectedRadio(e.target.id)}
            />
            <label htmlFor={continent}>{continent}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
