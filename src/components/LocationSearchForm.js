import React, { useState } from 'react'; 

const LocationSearchForm = (props) => {
  const [currentCity, setCurrentCity] = useState('');

  const onCitySearch = (event) => {
    setCurrentCity(event.target.value)
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    props.searchCurrentCityCallBack(currentCity);
  };

  return (
    <form className='currentCity-search-form' onSubmit={onFormSubmit}>
      <div className='search-box'>
        <input  
          type='text'
          className='search-bar'
          placeholder='City, Country '
          onChange={onCitySearch}
          value={currentCity}
        />
      </div>
    </form>
  );

}

export default LocationSearchForm;