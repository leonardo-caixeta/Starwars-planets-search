import React, { useEffect, useState } from 'react';

function TableOfPlanets() {
  const [data, setData] = useState();
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((api) => api.json())
      .then(({ results }) => setData(results));
  }, []);

  const handleOnChange = ({ target }) => {
    setFilterText(target.value);
  };

  const filteredData = data && data.filter((el) => el.name.toLowerCase()
    .includes(filterText.toLowerCase()));

  return (
    <>
      <label htmlFor="name-filter">
        <input
          type="text"
          id="name-filter"
          data-testid="name-filter"
          onChange={ handleOnChange }
          value={ filterText }
        />

      </label>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Climate</th>
            <th>Terrain</th>
            <th>Population</th>
            <th>Diameter</th>
            <th>Gravity</th>
            <th>Orbital Period</th>
            <th>Rotation Period</th>
            <th>Surface Water</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredData && filteredData.map((el, index) => (
            <tr key={ index }>
              <td>{el.name}</td>
              <td>{el.climate}</td>
              <td>{el.terrain}</td>
              <td>{el.population}</td>
              <td>{el.diameter}</td>
              <td>{el.gravity}</td>
              <td>{el.orbital_period}</td>
              <td>{el.rotation_period}</td>
              <td>{el.surface_water}</td>
              <td>{el.films.join(', ')}</td>
              <td>{el.created}</td>
              <td>{el.edited}</td>
              <td>{el.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>

  );
}

export default TableOfPlanets;
